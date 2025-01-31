import { CategoriesRepository } from "../../repositories/categories.repository";
import { CreateCategoryController } from "./create-categories.controller";
import { CreateCategoryUseCase } from "./create-categories.use-case";

const categoriesRepository = CategoriesRepository.getInstance()
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController } 