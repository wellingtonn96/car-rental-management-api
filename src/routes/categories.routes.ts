import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/use-cases/create-categories/create-categories.controller';
import { ImportCategoriesController } from '../modules/cars/use-cases/import-categories/import-categories.controller';
import { GetCategoriesController } from '../modules/cars/use-cases/list-categories/get-categories.controller';

const upload = multer({
  dest: './tmp'
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const getCategoryController = new GetCategoriesController();
const importCategoryController = new ImportCategoriesController();
// @ts-ignore
categoriesRoutes.post('/', (request, response) =>
  createCategoryController.handle(request, response)
);

// @ts-ignore
categoriesRoutes.get('/', (request, response) =>
  getCategoryController.handle(request, response)
);

// @ts-ignore
categoriesRoutes.post('/import', upload.single('file'), (request, response) =>
  importCategoryController.handler(request, response)
);

export { categoriesRoutes };
