import bunyan from 'bunyan';

type LevelType = 'debug' | 'info' | 'warn' | 'error';
const levels = ['debug', 'info', 'warn', 'error'];

export default class Logger {
  private logger: bunyan;

  constructor(name: string, minLogLevel?: LevelType) {
    let level: LevelType = minLogLevel || 'info';
    if (process.env.LOG_LEVEL !== undefined) {
      if (levels.includes(process.env.LOG_LEVEL)) {
        level = <LevelType>process.env.LOG_LEVEL;
      }
    }
    this.logger = bunyan.createLogger({
      name,
      level,
    });
  }

  debug(message: string, context?: any) {
    if (context) {
      this.logger.debug(message, context);
    } else {
      this.logger.debug(message);
    }
  }

  info(message: string, context?: any) {
    if (context) {
      this.logger.info(message, context);
    } else {
      this.logger.info(message);
    }
  }

  warn(message: string, context?: any) {
    if (context) {
      this.logger.warn(message, context);
    } else {
      this.logger.warn(message);
    }
  }

  error(message: string, context?: any) {
    if (context) {
      this.logger.error(message, context);
    } else {
      this.logger.error(message);
    }
  }
}
