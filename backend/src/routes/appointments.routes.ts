import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const appointmentsRouter = Router();
const appointments: Array<unknown> = [];

appointmentsRouter.get('/', (req, res) => res.json(appointments));

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
