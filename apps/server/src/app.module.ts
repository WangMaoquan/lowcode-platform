import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { ProjectModule } from './modules/project/project.module'
import { TemplateModule } from './modules/template/template.module'
import { PrismaModule } from './prisma/prisma.module'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET', 'dev-secret-change-in-production')
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
