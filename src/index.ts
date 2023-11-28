import { Test } from './components/test-component';
import logger from './shared/logger';

logger.info({
  message: 'Starting server'
});
new Test().test();
