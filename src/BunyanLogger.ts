import bunyan from 'bunyan';

import { ILogger } from './ILogger';
import { InvalidLogConfigError } from './LoggerErrors';

type LevelType = 'debug' | 'info' | 'warn' | 'error';
const levels = ['debug', 'info', 'warn', 'error'];

export class BunyanLogger implements ILogger {
  private logger: bunyan;
  private name: string;
  private level: LevelType;

  constructor(name: string, minLogLevel?: LevelType) {
    if(minLogLevel && !levels.includes(minLogLevel)) {
      throw new InvalidLogConfigError(`Unknown log level provided: ${minLogLevel}`);
    }

    let level: LevelType = minLogLevel || 'info';
    if (!minLogLevel && process.env.LOG_LEVEL !== undefined) {
      if (levels.includes(process.env.LOG_LEVEL)) {
        level = <LevelType>process.env.LOG_LEVEL;
      }
    }

    this.name = name;
    this.level = level;
    this.logger = bunyan.createLogger({
      name,
      level,
    });

    this.logger.debug(`Logger ${name} initialised with log level ${level}`);
  }

  child(name: string) {
    return new BunyanLogger(`${this.name}/${name}`, this.level);
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
