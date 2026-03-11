import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'
import logger from '../../utils/logger'
import { DataValidator } from '../../utils/data-validator'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * 记录错误日志并区分错误类型
   */
  private logError(error: any, context: string, isOperational: boolean = true) {
    const logData = {
      context,
      timestamp: new Date().toISOString(),
      stack: error.stack,
      isOperational,
    }
    
    if (isOperational) {
      // 操作性错误（预期内的业务错误）
      logger.warn(`${context}: ${error.message}`, logData)
    } else {
      // 系统性错误（需要关注的bug）
      logger.error(`${context}: ${error.message}`, logData)
    }
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException('用户不存在')
    }
    return user
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } })
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async update(id: string, data: UpdateUserDto) {
    // 获取当前用户信息
    const currentUser = await this.findById(id)

    // 使用统一的数据验证器预处理数据
    let processedData: Partial<UpdateUserDto>
    try {
      processedData = DataValidator.standardizeUpdateUserData(data)
    } catch (error) {
      this.logError(error, `Data validation failed for user ${id}`, true)
      throw new ConflictException('数据格式验证失败')
    }

    // 检查用户名是否已存在（使用标准化后的数据）
    if (
      processedData.username !== undefined &&
      processedData.username !== null &&
      processedData.username !== currentUser.username
    ) {
      const existingUser = await this.findByUsername(processedData.username)
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('用户名已被使用')
      }
    }

    // 检查邮箱是否已存在（使用标准化后的数据）
    if (
      processedData.email !== undefined &&
      processedData.email !== null &&
      processedData.email !== currentUser.email
    ) {
      const existingUser = await this.findByEmail(processedData.email)
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('邮箱已被使用')
      }
    }

    logger.debug(`Updating user ${id} with validated data:`, { 
      fields: Object.keys(processedData),
      userId: id 
    })

    return this.prisma.user.update({
      where: { id },
      data: processedData,
    })
  }

  async getUserStats(userId: string) {
    try {
      // Template 模型暂无用户关联，暂时不统计模板数量
      // TODO: 未来可以在 Template 模型中添加 userId 字段，实现用户模板统计
      // 当前只返回项目统计，模板统计设为 null 表示暂不可用
      const projectCount = await this.prisma.project.count({ where: { userId } })

      logger.debug(`Successfully retrieved user stats for user ${userId}: ${projectCount} projects`)
      
      return {
        projectCount,
        templateCount: null, // 暂不可用，等待 Template 模型添加用户关联
      }
    } catch (error) {
      this.logError(error, `getUserStats for user ${userId}`, false) // 系统性错误
      
      // 发生异常时也返回有意义的部分数据，而不是全部归零
      try {
        const projectCount = await this.prisma.project.count({ where: { userId } })
        logger.info(`Partial success retrieving project stats for user ${userId} after error`)
        return {
          projectCount,
          templateCount: null,
        }
      } catch (fallbackError) {
        this.logError(fallbackError, `getUserStats fallback for user ${userId}`, true) // 操作性错误
        return {
          projectCount: 0,
          templateCount: null,
        }
      }
    }
  }
}
