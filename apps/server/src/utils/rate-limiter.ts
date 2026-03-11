import { Request } from 'express'

/**
 * 简单的内存速率限制器
 * 生产环境建议使用 Redis 等专业方案
 */
interface RateLimitInfo {
  count: number
  resetTime: number
}

class RateLimiter {
  private limits: Map<string, RateLimitInfo> = new Map()
  private readonly windowMs: number
  private readonly maxRequests: number

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs // 默认1分钟窗口
    this.maxRequests = maxRequests // 默认最多10次请求
  }

  /**
   * 检查是否超过速率限制
   * @param identifier 标识符（通常是IP地址或用户ID）
   * @returns 是否被限制
   */
  isRateLimited(identifier: string): boolean {
    const now = Date.now()
    const limitInfo = this.limits.get(identifier)

    if (!limitInfo || now > limitInfo.resetTime) {
      // 首次请求或窗口期已过，重置计数器
      this.limits.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      })
      return false
    }

    if (limitInfo.count >= this.maxRequests) {
      return true
    }

    // 增加计数
    limitInfo.count++
    return false
  }

  /**
   * 从请求中获取客户端标识符
   */
  getClientIdentifier(req: Request): string {
    // 优先使用X-Forwarded-For（经过代理的情况）
    const forwardedFor = req.headers['x-forwarded-for'] as string
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim()
    }
    
    // 其次使用真实IP
    const realIp = req.headers['x-real-ip'] as string
    if (realIp) {
      return realIp
    }
    
    // 最后使用连接IP
    return req.ip || req.connection.remoteAddress || 'unknown'
  }

  /**
   * 清理过期的限制记录（防止内存泄漏）
   */
  cleanup(): void {
    const now = Date.now()
    for (const [key, value] of this.limits.entries()) {
      if (now > value.resetTime) {
        this.limits.delete(key)
      }
    }
  }
}

// 创建不同接口的速率限制器实例
export const usernameCheckLimiter = new RateLimiter(60000, 5) // 检查用户名：1分钟最多5次
export const emailCheckLimiter = new RateLimiter(60000, 5)    // 检查邮箱：1分钟最多5次

export default RateLimiter