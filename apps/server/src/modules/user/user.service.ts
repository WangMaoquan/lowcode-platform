import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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

    // 检查用户名是否已存在（忽略空字符串和未变更的值）
    if (
      data.username !== undefined &&
      data.username !== null &&
      data.username.trim() !== '' &&
      data.username.trim() !== currentUser.username
    ) {
      const existingUser = await this.findByUsername(data.username.trim())
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('用户名已被使用')
      }
    }

    // 检查邮箱是否已存在（忽略空字符串和未变更的值）
    if (
      data.email !== undefined &&
      data.email !== null &&
      data.email.trim() !== '' &&
      data.email.trim() !== currentUser.email
    ) {
      const existingUser = await this.findByEmail(data.email.trim())
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('邮箱已被使用')
      }
    }

    // 清理数据
    const cleanData: any = { ...data }
    if (data.username !== undefined) {
      cleanData.username = data.username.trim() || null
    }
    if (data.email !== undefined) {
      cleanData.email = data.email.trim() || null
    }

    return this.prisma.user.update({
      where: { id },
      data: cleanData,
    })
  }

  async getUserStats(userId: string) {
    try {
      const [projectCount, templateCount] = await this.prisma.$transaction([
        this.prisma.project.count({ where: { userId } }),
        this.prisma.template.count({ where: { authorId: userId } }),
      ])

      return {
        projectCount,
        templateCount,
      }
    } catch (error) {
      // 记录错误并返回默认值
      console.error('Failed to get user stats:', error)
      return {
        projectCount: 0,
        templateCount: 0,
      }
    }
  }
}
