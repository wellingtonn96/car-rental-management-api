import { Request, Response } from 'express';

import { GetSpecificationsUseCase } from './get-categories.use-case';

export class GetSpecificationsController {
  constructor(private getSpecificationsUseCase: GetSpecificationsUseCase) {}
  public handle(request: Request, response: Response): Response {
    try {
      const specificationsList = this.getSpecificationsUseCase.execute();
      return response.status(200).json(specificationsList);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
