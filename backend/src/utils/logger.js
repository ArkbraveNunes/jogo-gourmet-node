const proc = require('process')
const winston = require('winston')

module.exports = class Logger {
  static logMessage() {
    return winston.createLogger({
      defaultMeta: {
        name: 'api-gourmet-game',
        pid: proc.pid,
        time: new Date(),
      },
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      transports: [new winston.transports.Console()],
    })
  }

  static debug(msg) {
    this.logMessage().debug(msg)
  }

  static info(msg) {
    this.logMessage().info(msg)
  }

  static error(msg) {
    this.logMessage().log({
      level: 'error',
      message: typeof msg === 'object' ? JSON.stringify(msg) : msg,
      stack: new Error(msg).stack,
    })
  }

  static warn(msg) {
    this.logMessage().warn(msg)
  }
}
