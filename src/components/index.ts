import express, { Response, Request } from 'express';
import { UserApi } from './user/entry-points/api';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  return res.json({});
});

router.use('/users', UserApi.router);

(function initComponents() {
  UserApi.init();
})();

export default router;
