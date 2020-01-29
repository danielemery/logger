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

  debug(message: string, context: any) {
    this.logger.debug(message, context);
  }

  info(message: string, context: any) {
    this.logger.info(message, context);
  }

  warn(message: string, context: any) {
    this.logger.warn(message, context);
  }

  error(message: string, context: any) {
    this.logger.error(message, context);
  }
}
