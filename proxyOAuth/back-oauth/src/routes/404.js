import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
  return res
    .status(404)
    .send({ message: `${req.method} ${req.url} 404 Not Found` });
});

export default router;
