import * as winston from 'winston'

// 定义日志级别
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// 根据环境选择日志级别
const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

// 定义日志颜色
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

// 添加颜色到winston
winston.addColors(colors)

// 自定义格式
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

// 声明 transports 为多类型联合，解决类型兼容性问题
type TransportInstances = 
  | winston.transports.ConsoleTransportInstance
  | winston.transports.FileTransportInstance
  | winston.transports.HttpTransportInstance
  | winston.transports.StreamTransportInstance

// 开发环境：控制台输出
const transports: TransportInstances[] = [
  new winston.transports.Console(),
]

// 生产环境：添加文件输出
if (process.env.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
  )
}

// 创建logger实例
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export default logger