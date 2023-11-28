import { AppLoggerConfig } from './config';
import { LogLevel } from './enum';
import { AppLogger } from './logger';

const loggerConfig = new AppLoggerConfig();

const logger = AppLogger.init({
  level: loggerConfig.configValues?.LOG_LEVEL ?? LogLevel.INFO
})!;

export default logger;
