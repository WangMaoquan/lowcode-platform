import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req: { user: { id: string } }) {
    return this.userService.findById(req.user.id)
  }

  @Put('profile')
  async updateProfile(
    @Request() req: { user: { id: string } },
    @Body() data: { nickname?: string; email?: string; avatar?: string }
  ) {
    return this.userService.update(req.user.id, data)
  }
}
