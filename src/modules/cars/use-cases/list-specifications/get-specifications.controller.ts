import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetSpecificationsUseCase } from './get-specifications.use-case';

export class GetSpecificationsController {
  public async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const getSpecificationsUseCase = container.resolve(
        GetSpecificationsUseCase
      );
      const specificationsList = await getSpecificationsUseCase.execute();
      return response.status(200).json(specificationsList);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
