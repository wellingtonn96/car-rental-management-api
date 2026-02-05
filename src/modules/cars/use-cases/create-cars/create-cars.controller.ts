import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarsUseCase } from './create-cars.use-case';

class CreateCarsController {
  public async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const {
        name,
        description,
        dailyRate,
        licensePlate,
        fineAmount,
        available,
        brand,
        categoryId
      } = request.body;

      const createCategoryUseCase = container.resolve(CreateCarsUseCase);

      const carsCreated = await createCategoryUseCase.execute({
        name,
        description,
        dailyRate,
        licensePlate,
        fineAmount,
        available,
        brand,
        categoryId
      });

      return response.status(201).json(carsCreated);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateCarsController };
