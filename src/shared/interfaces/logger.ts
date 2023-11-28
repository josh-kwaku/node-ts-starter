import pino, { Bindings, Logger, LoggerOptions } from 'pino';

export type LogOptions = {
  data?: Record<any, any>;
  error?: any;
  message?: string;
};

export interface BaseLogger {
  debug(options: LogOptions): void;

  trace(options: LogOptions): void;

  info(options: LogOptions): void;

  warn(options: LogOptions): void;

  error(options: LogOptions): void;

  fatal(options: LogOptions): void;

  createChildLogger(config: {
    default_data: Bindings;
    options?: Record<any, any>;
  }): Logger;
}
