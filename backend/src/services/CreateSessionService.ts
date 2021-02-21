import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/authConfig';
import User from '../models/User';

interface SessionRequestDTO {
  email: string;
  password: string;
}

interface SessionResponseDTO {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({
    email,
    password,
  }: SessionRequestDTO): Promise<SessionResponseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) throw new Error('Invalid email/password combination');

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) throw new Error('Invalid email/password combination');

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
