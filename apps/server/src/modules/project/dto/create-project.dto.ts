import { IsString, IsOptional, IsObject } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsObject()
  schema?: Record<string, unknown>
}
