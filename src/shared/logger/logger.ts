import pino, { LoggerOptions, Logger, Bindings } from 'pino';
import { BaseLogger, LogOptions } from '../interfaces';

export class AppLogger implements BaseLogger {
  public static lib_instance: Logger;
  private static instance: BaseLogger;

  private constructor() {}

  static init(options: LoggerOptions = {}): BaseLogger {
    if (AppLogger.instance === undefined) {
      if (AppLogger.lib_instance === undefined) {
        AppLogger.lib_instance = pino(options);
      }
      AppLogger.instance = new AppLogger();
    }
    return AppLogger.instance;
  }

  debug(options: LogOptions) {
    AppLogger.lib_instance!.debug(options.data, options.message);
  }

  trace(options: LogOptions) {
    AppLogger.lib_instance!.trace(options.data, options.message);
  }

  info(options: LogOptions) {
    AppLogger.lib_instance!.info(options.data, options.message);
  }

  warn(options: LogOptions) {
    AppLogger.lib_instance!.warn(options.data, options.message);
  }

  error(options: LogOptions) {
    AppLogger.lib_instance!.error(options.error, options.message);
  }

  fatal(options: LogOptions) {
    AppLogger.lib_instance!.error(options.error, options.message);
  }

  createChildLogger(config: {
    default_data: Bindings;
    options?: Record<any, any>;
  }): Logger {
    return AppLogger.lib_instance!.child(
      config.default_data,
      config.options ?? {}
    );
  }
}
