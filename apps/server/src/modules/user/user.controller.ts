import { Controller, Get, Put, Body, UseGuards, Request, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req: { user: { id: string } }) {
    return this.userService.findById(req.user.id)
  }

  @Get('stats')
  async getStats(@Request() req: { user: { id: string } }) {
    return this.userService.getUserStats(req.user.id)
  }

  @Put('profile')
  async updateProfile(@Request() req: { user: { id: string } }, @Body() data: UpdateUserDto) {
    return this.userService.update(req.user.id, data)
  }

  @Get('check-username')
  @UseGuards(JwtAuthGuard)
  async checkUsername(@Query('username') username: string) {
    const user = await this.userService.findByUsername(username)
    return { available: !user }
  }

  @Get('check-email')
  @UseGuards(JwtAuthGuard)
  async checkEmail(@Query('email') email: string) {
    const user = await this.userService.findByEmail(email)
    return { available: !user }
  }
}
