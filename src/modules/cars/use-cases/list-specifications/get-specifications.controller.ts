import { Request, Response } from 'express';

import { GetCategoriesUseCase } from './get-specifications.use-case';

export class GetCategoriesController {
  constructor(private getCategoriesUseCase: GetCategoriesUseCase) {}
  public handle(request: Request, response: Response): Response {
    try {
      const categoriesList = this.getCategoriesUseCase.execute();
      return response.status(200).json(categoriesList);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
