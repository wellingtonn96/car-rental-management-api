import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../accounts/repositories/users.repository';

interface IPayload {
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const token = authHeader.split(' ')[1];

  try {
    const { sub } = verify(
      token,
      'c3324856b2b582d2cd445d9c54ed4197'
    ) as IPayload;

    const userRepository = new UsersRepository();

    const user = userRepository.getUserById(sub);

    if (!user) {
      throw new Error('User does not exists');
    }

    next();
  } catch (error: any) {
    throw new Error('Invalid token');
  }
}
