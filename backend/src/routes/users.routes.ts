import { Router } from 'express';
import { hash } from 'bcryptjs';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const hashedPassword = await hash(password, 8);
    const user = await createUserService.execute({
      name,
      email,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: justDiscardThis, ...userWithoutPasswd } = user;

    return res.json(userWithoutPasswd);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default usersRouter;
