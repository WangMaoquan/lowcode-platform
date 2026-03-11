import { Controller, Get, Put, Body, Request, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { RequireLogin } from 'src/common/decorator/requireLogin.decorator'

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
  async checkUsername(@Query('username') username: string) {
    const user = await this.userService.findByUsername(username)
    return { available: !user }
  }

  @Get('check-email')
  @RequireLogin()
  async checkEmail(@Query('email') email: string) {
    const user = await this.userService.findByEmail(email)
    return { available: !user }
  }
}
