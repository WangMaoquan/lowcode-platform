import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Observable } from 'rxjs'

interface JwtUserData {
  sub?: string
  userId?: string
  username: string
}

declare module 'express' {
  interface Request {
    user: JwtUserData
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private reflector: Reflector

  @Inject(JwtService)
  private jwtService: JwtService

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const requireLogin = this.reflector.getAllAndOverride('require-login', [
      context.getClass(),
      context.getHandler(),
    ])

    if (!requireLogin) {
      return true
    }

    const authorization = request.headers.authorization

    if (!authorization) {
      throw new UnauthorizedException('用户未登录')
    }

    try {
      const token = authorization.split(' ')[1]
      const data = this.jwtService.verify<JwtUserData>(token)

      const userId = data.sub || data.userId

      request.user = {
        userId,
        username: data.username,
      }
      
      // 移除了自动token刷新逻辑
      // 原因：每次请求都设置新token会导致客户端token混乱和安全风险
      // 建议：客户端应检测token过期并主动调用刷新接口
      // TODO: 未来可以实现标准的access token + refresh token机制
      
      return true
    } catch {
      throw new UnauthorizedException('token 失效，请重新登录')
    }
  }
}
