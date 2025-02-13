import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/use-cases/create-categories/create-categories.controller';
import { ImportCategoriesController } from '../modules/cars/use-cases/import-categories/import-categories.controller';
import { GetCategoriesController } from '../modules/cars/use-cases/list-categories/get-categories.controller';
import ensureAuthenticated from '../modules/middlewares/ensure-authenticated';

const upload = multer({
  dest: './tmp'
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const getCategoryController = new GetCategoriesController();
const importCategoryController = new ImportCategoriesController();

categoriesRoutes.use(ensureAuthenticated);

// @ts-ignore
categoriesRoutes.post('/', createCategoryController.handle);

// @ts-ignore
categoriesRoutes.get('/', getCategoryController.handle);

// @ts-ignore
categoriesRoutes.post('/import', upload.single('file'), (request, response) =>
  importCategoryController.handler(request, response)
);

export { categoriesRoutes };
