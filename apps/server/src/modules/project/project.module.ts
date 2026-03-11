import { Module } from '@nestjs/common'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from 'src/common/guards/jwt-auth.guard'

@Module({
  controllers: [ProjectController],
  providers: [
    ProjectService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
