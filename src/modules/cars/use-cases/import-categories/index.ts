import { CategoriesRepository } from '../../repositories/categories.repository';
import { CreateCategoryUseCase } from '../create-categories/create-categories.use-case';
import { ImportCategoriesController } from './import-categories.controller';
import { ImportCategoriesUseCase } from './import-categories.use-case';

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoriesRepository = new CreateCategoryUseCase(
  categoriesRepository
);
const importCategoryUseCase = new ImportCategoriesUseCase(
  categoriesRepository,
  createCategoriesRepository
);
const importCategoryController = new ImportCategoriesController(
  importCategoryUseCase
);

export { importCategoryController };
