import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { ProjectModule } from './modules/project/project.module'
import { TemplateModule } from './modules/template/template.module'
import { PrismaModule } from './prisma/prisma.module'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import envValidationSchema from './config/validation.schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: false, // 显示所有验证错误
        allowUnknown: true, // 允许未知的环境变量
      },
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET')
        if (!secret) {
          throw new Error('JWT_SECRET environment variable is required. Please set a secure JWT secret in your environment variables.')
        }
        
        // 验证密钥强度（额外安全检查）
        if (secret.length < 32) {
          throw new Error('JWT_SECRET must be at least 32 characters long for security reasons.')
        }
        
        const expiresIn = configService.get<JwtModuleOptions['signOptions']['expiresIn']>(
          'JWT_EXPIRES_IN',
          '7d'
        )

        return {
          secret,
          signOptions: {
            expiresIn,
          },
        }
      },
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    ProjectModule,
    TemplateModule,
  ],
})
export class AppModule {}
