import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../accounts/repositories/users.repository';
import { AppError } from '../errors/app-error';

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
    throw new AppError('Token missing', 401);
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
      throw new AppError('User does not exists', 401);
    }

    request.user = {
      userId: sub
    };

    next();
  } catch (error: any) {
    throw new AppError('Invalid token', 401);
  }
}
