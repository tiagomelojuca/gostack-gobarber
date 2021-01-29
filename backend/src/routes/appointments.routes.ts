import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (req, res) =>
  res.json({ message: 'Hello GoBarber!' }),
);

export default appointmentsRouter;
