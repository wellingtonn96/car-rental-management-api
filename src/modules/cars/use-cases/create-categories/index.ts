import { CategoriesRepository } from "../../repositories/PostgresCategoriesRepository";
import { CreateCategoryController } from "./create-categorie.controller";
import { CreateCategoryUseCase } from "./create-categorie.use-case";

const categoriesRepository = new CategoriesRepository()
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController }