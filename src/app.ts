import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler
} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pinoHttp from 'pino-http';
import appLogger from './shared/logger';
import router from './components';
import { AppLogger } from './shared/logger/logger';
import { ErrorHandler } from './shared/error';

const app: Express = express();

app.use(cors());
app.use(
  pinoHttp({
    logger: AppLogger.lib_instance
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  bodyParser.json()(req, res, (err) => {
    if (err) {
      appLogger.error({ error: err });
      // perform extra error handling here
    }
    next();
  });
});

app.use(router);

const errorHandler = new ErrorHandler();
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  await errorHandler.handleError(err);
});

export default app;
