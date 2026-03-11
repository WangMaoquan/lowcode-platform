import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { AuthGuard } from '../../common/guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @Post('logout')
  async logout(@Request() _req: Request) {
    // Logout is handled client-side by removing the token
    // Server-side just returns success message (stateless logout)
    return { message: '退出成功' }
  }
}
