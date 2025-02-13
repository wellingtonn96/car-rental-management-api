import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { CreateUserUseCase } from './create-user.use-case';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, password, driverLicense, email } = request.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);
      await createUserUseCase.execute({
        name,
        password,
        driverLicense,
        email
      });

      return response.status(201).json();
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController };
