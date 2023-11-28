import express, { Response, Request } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  return res.json({});
});

export default router;
