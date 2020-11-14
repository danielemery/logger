export interface ILogger {
  /** Log a debug level message with optional context. */
  debug(message: string, context?: any): void;
  /** Log an info message with optional context. */
  info(message: string, context?: any): void;
  /** Log a warning message with optional context. */
  warn(message: string, context?: any): void;
  /** Log an error message with optional context. */
  error(message: string, context?: any): void;

  /** Create a child logger scoped under the provided name. */
  child(name: string): ILogger;
}
