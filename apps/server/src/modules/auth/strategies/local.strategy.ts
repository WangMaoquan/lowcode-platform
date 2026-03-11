import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username' })
  }

  async validate(
    username: string,
    password: string
  ): Promise<{
    access_token: string
    user: { id: string; username: string; nickname?: string; email?: string }
  }> {
    const result = await this.authService.login({ username, password })
    if (!result) {
      throw new UnauthorizedException()
    }
    return result
  }
}
