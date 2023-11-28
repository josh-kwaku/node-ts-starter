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

const app: Express = express();

app.use(cors());
app.use(
  pinoHttp({
    logger: appLogger
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

export default app;
