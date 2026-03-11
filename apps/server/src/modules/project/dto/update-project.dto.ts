import { IsString, IsOptional, IsObject } from 'class-validator'

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsObject()
  schema?: Record<string, unknown>
}
