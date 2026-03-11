import { isEmpty, trim } from 'lodash-es'

/**
 * 统一空值处理工具
 * 确保所有地方的空值处理逻辑一致
 */

export class DataValidator {
  /**
   * 标准化字符串字段：去除首尾空格，空字符串转为null
   * 与Prisma schema的约束保持一致
   */
  static standardizeString(value: string | null | undefined): string | null {
    if (value === null || value === undefined) {
      return null
    }
    
    const trimmed = trim(String(value))
    return isEmpty(trimmed) ? null : trimmed
  }

  /**
   * 标准化可选字段，与Prisma可选字段约束保持一致
   */
  static standardizeOptionalField<T extends string | null | undefined>(
    value: T,
    defaultValue: T = null as T
  ): T {
    if (value === undefined) {
      return defaultValue
    }
    
    if (typeof value === 'string') {
      return DataValidator.standardizeString(value) as unknown as T
    }
    
    return value
  }

  /**
   * 验证email格式并标准化
   */
  static standardizeEmail(email: string | null | undefined): string | null {
    const standardized = DataValidator.standardizeString(email)
    
    if (standardized === null) {
      return null
    }
    
    // 简单的email格式验证（更严格的验证应该在DTO层面）
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(standardized)) {
      throw new Error('Invalid email format')
    }
    
    return standardized.toLowerCase()
  }

  /**
   * 批量标准化用户更新数据
   */
  static standardizeUpdateUserData(data: any): any {
    const standardized: any = { ...data }
    
    if (data.username !== undefined) {
      standardized.username = DataValidator.standardizeString(data.username)
    }
    
    if (data.email !== undefined) {
      standardized.email = DataValidator.standardizeEmail(data.email)
    }
    
    if (data.nickname !== undefined) {
      standardized.nickname = DataValidator.standardizeString(data.nickname)
    }
    
    if (data.avatar !== undefined) {
      standardized.avatar = DataValidator.standardizeString(data.avatar)
    }
    
    return standardized
  }
}