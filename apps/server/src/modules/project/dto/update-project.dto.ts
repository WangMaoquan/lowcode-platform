import { IsString, IsOptional, IsObject } from 'class-validator'
import type { InputJsonValue } from '@prisma/client/runtime/library'

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsObject()
  schema?: InputJsonValue
}
