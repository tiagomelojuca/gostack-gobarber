import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Array<Appointment> = [];

appointmentsRouter.get('/', (req, res) => res.json(appointments));

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));
  const foundAppointment = appointments.findIndex(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (foundAppointment > -1) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
