import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase
      );

      const authenticateUser = await authenticateUserUseCase.execute({
        email,
        password
      });

      return response.status(201).json(authenticateUser);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { AuthenticateUserController };
