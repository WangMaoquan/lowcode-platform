import { IsString, IsOptional, IsObject } from 'class-validator'
import type { InputJsonValue } from '@prisma/client/runtime/library'

export class CreateProjectDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsObject()
  schema?: InputJsonValue
}
