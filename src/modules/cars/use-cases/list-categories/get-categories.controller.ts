import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetCategoriesUseCase } from './get-categories.use-case';

export class GetCategoriesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    try {
      const categoriesListUseCase = container.resolve(GetCategoriesUseCase);
      const categoriesList = await categoriesListUseCase.execute();
      return response.status(200).json(categoriesList);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
