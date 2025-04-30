import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from './create-specification.use-case';

export class CreateSpecificationController {
  public async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { name, description } = request.body;

      const createSpecificationUseCase = container.resolve(
        CreateSpecificationUseCase
      );

      await createSpecificationUseCase.execute({ name, description });

      return response.status(201).json();
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
