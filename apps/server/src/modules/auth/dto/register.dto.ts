import { IsString, MinLength, IsOptional, IsEmail } from 'class-validator';
import { IsStrongPassword, IsPasswordCompatible } from '../../../common/validators/password.validator';

/**
 * 用户注册数据传输对象
 * 
 * @remarks
 * 密码强度要求：
 * - 至少8个字符
 * - 包含大写字母 (A-Z)
 * - 包含小写字母 (a-z) 
 * - 包含数字 (0-9)
 * - 包含特殊字符 (@$!%*?&)
 * 
 * 为了向后兼容，暂时同时支持简单验证，但推荐使用强密码验证
 */
export class RegisterDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  // 临时兼容旧版本的最小长度要求
  @IsPasswordCompatible()
  // TODO: 在下个版本中移除上面的兼容验证，只保留强密码验证
  // @IsStrongPassword({
  //   message: '密码必须包含至少8个字符，包括：大写字母、小写字母、数字和特殊字符(@$!%*?&)'
  // })
  password: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
