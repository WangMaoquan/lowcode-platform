import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator'

// 密码强度验证规则
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// 密码强度错误消息
const PASSWORD_ERROR_MESSAGE = '密码必须包含至少8个字符，包括：大写字母、小写字母、数字和特殊字符(@$!%*?&)'

@ValidatorConstraint({ name: 'strongPassword', async: false })
export class StrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (!password) return false
    return PASSWORD_REGEX.test(password)
  }

  defaultMessage(args: ValidationArguments) {
    return PASSWORD_ERROR_MESSAGE
  }
}

// 自定义装饰器，用于密码强度验证
export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: StrongPasswordConstraint,
    })
  }
}

// 向后兼容的简单密码验证（最小长度）
export function IsPasswordCompatible(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: '密码至少需要6个字符',
      },
      constraints: [],
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.length >= 6
        },
      },
    })
  }
}