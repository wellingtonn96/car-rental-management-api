import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './create-categories.use-case';
import { container } from 'tsyringe';

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
