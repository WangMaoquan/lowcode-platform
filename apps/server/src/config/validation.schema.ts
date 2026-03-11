import * as Joi from 'joi';

// 环境变量验证模式
const envValidationSchema = Joi.object({
  // 数据库配置
  DATABASE_URL: Joi.string().required().description('MySQL数据库连接URL'),
  
  // JWT配置 - 强制要求，不允许默认值
  JWT_SECRET: Joi.string().min(32).required().description('JWT密钥，至少32个字符'),
  JWT_EXPIRES_IN: Joi.string().default('7d').description('JWT过期时间'),
  
  // 服务配置
  PORT: Joi.number().default(3001).description('服务器端口'),
  
  // 环境标识
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
});

export default envValidationSchema;