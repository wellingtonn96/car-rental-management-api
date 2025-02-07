import { Request, Response } from 'express';

import { ImportCategoriesUseCase } from './import-categories.use-case';
import { container } from 'tsyringe';

class ImportCategoriesController {
  public async handler(request: Request, response: Response) {
    const { file } = request;
    const importCategories = container.resolve(ImportCategoriesUseCase);
    await importCategories.execute(file as Express.Multer.File);
    return response.status(200).json(file);
  }
}

export { ImportCategoriesController };
