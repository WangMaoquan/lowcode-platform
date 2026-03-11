import { IsString, IsOptional, IsEmail, MinLength, MaxLength } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  nickname?: string

  @IsOptional()
  @IsString()
  avatar?: string
}
