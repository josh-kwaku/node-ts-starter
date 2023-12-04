import express, { Response, Request } from 'express';
import { UserApi } from './user/entry-points/api';

export class AppController {
  public static router = express.Router();

  static init() {
    AppController.router.get('/', (req: Request, res: Response) => {
      return res.json({});
    });

    AppController.router.use('/users', UserApi.router);

    UserApi.init();
  }
}
