import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './create-categories.use-case';

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
  public handle(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;

      this.createCategoryUseCase.execute({ name, description });

      return response.status(201).json();
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
