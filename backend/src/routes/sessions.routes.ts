import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const createSession = new CreateSessionService();

    const authenticatedUser = await createSession.execute({
      email,
      password,
    });

    const { user: userWithPassword, token } = authenticatedUser;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: justDiscardThis, ...user } = userWithPassword;

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
