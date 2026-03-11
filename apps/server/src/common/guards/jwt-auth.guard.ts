import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(
    err: Error | null,
    user: unknown,
    _info: Error | null,
    _context: ExecutionContext
  ): unknown {
    if (err || !user) {
      throw err || new UnauthorizedException('访问令牌无效或已过期')
    }
    return user
  }
}
