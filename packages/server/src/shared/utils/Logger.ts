import winston from 'winston'

const format = winston.format

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.json(),
        format.prettyPrint()
      )
    })
  ]
})

class Logger {
  static debug(message: string): void {
    logger.debug(message)
  }

  static info(message: string): void {
    logger.info(message)
  }

  static error(error: Error): void {
    logger.error({
      message: error.message,
      stack: error.stack
    })
  }
}

export { Logger }
