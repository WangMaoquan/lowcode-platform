import { Controller, Get, Put, Body, Request, Query, HttpCode, HttpStatus } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { RequireLogin } from 'src/common/decorator/requireLogin.decorator'
import { usernameCheckLimiter, emailCheckLimiter } from '../../utils/rate-limiter'
import { Request as ExpressRequest } from 'express'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @RequireLogin()
  async getProfile(@Request() req: { user: { id: string } }) {
    return this.userService.findById(req.user.id)
  }

  @Get('stats')
  @RequireLogin()
  async getStats(@Request() req: { user: { id: string } }) {
    return this.userService.getUserStats(req.user.id)
  }

  @Put('profile')
  @RequireLogin()
  async updateProfile(@Request() req: { user: { id: string } }, @Body() data: UpdateUserDto) {
    return this.userService.update(req.user.id, data)
  }

  @Get('check-username')
  @RequireLogin()
  @HttpCode(HttpStatus.OK)
  async checkUsername(@Request() req: ExpressRequest, @Query('username') username: string) {
    // 速率限制检查
    const clientId = usernameCheckLimiter.getClientIdentifier(req)
    if (usernameCheckLimiter.isRateLimited(clientId)) {
      // 即使被限制也返回相同的模糊响应，避免泄露信息
      return { available: true, message: '请求过于频繁，请稍后再试' }
    }

    // 参数验证
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return { available: true, message: '用户名格式不正确' }
    }

    try {
      const user = await this.userService.findByUsername(username.trim())
      
      // 模糊响应：无论是否存在都返回"可用"，但内部记录日志
      // 这样可以防止用户名枚举攻击，同时服务端仍能记录恶意行为
      if (user) {
        // 记录可能的枚举攻击尝试
        console.warn(`Possible username enumeration attempt detected from ${clientId} for username: ${username}`)
      }
      
      return { 
        available: true, 
        message: '用户名可用或格式正确' 
      }
    } catch (error) {
      // 发生错误时也返回模糊的成功响应
      return { available: true, message: '验证服务暂时不可用' }
    }
  }

  @Get('check-email')
  @RequireLogin()
  @HttpCode(HttpStatus.OK)
  async checkEmail(@Request() req: ExpressRequest, @Query('email') email: string) {
    // 速率限制检查
    const clientId = emailCheckLimiter.getClientIdentifier(req)
    if (emailCheckLimiter.isRateLimited(clientId)) {
      // 即使被限制也返回相同的模糊响应，避免泄露信息
      return { available: true, message: '请求过于频繁，请稍后再试' }
    }

    // 参数验证
    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return { available: true, message: '邮箱格式不正确' }
    }

    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    if (!emailRegex.test(email.trim())) {
      return { available: true, message: '邮箱格式不正确' }
    }

    try {
      const user = await this.userService.findByEmail(email.trim())
      
      // 模糊响应：无论是否存在都返回"可用"，但内部记录日志
      if (user) {
        // 记录可能的枚举攻击尝试
        console.warn(`Possible email enumeration attempt detected from ${clientId} for email: ${email}`)
      }
      
      return { 
        available: true, 
        message: '邮箱可用或格式正确' 
      }
    } catch (error) {
      // 发生错误时也返回模糊的成功响应
      return { available: true, message: '验证服务暂时不可用' }
    }
  }
}
