import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './create-categories.use-case';

export class CreateCategoryController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      await createCategoryUseCase.execute({ name, description });

      return response.status(201).json();
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
