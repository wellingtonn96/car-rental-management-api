import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/use-cases/create-categories/create-categories.controller';
import { ImportCategoriesController } from '@modules/cars/use-cases/import-categories/import-categories.controller';
import { GetCategoriesController } from '@modules/cars/use-cases/list-categories/get-categories.controller';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensure-authenticated';

import uploadConfig from '../../../../config/upload';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const getCategoryController = new GetCategoriesController();
const importCategoryController = new ImportCategoriesController();

categoriesRoutes.use(ensureAuthenticated);

const uploadCsvCategories = multer(uploadConfig.upload('./tmp/csv_categories'));

// @ts-ignore
categoriesRoutes.post('/', createCategoryController.handle);

// @ts-ignore
categoriesRoutes.get('/', getCategoryController.handle);

categoriesRoutes.post(
  '/import',
  uploadCsvCategories.single('file'),
  // @ts-ignore
  importCategoryController.handler
);

export { categoriesRoutes };
