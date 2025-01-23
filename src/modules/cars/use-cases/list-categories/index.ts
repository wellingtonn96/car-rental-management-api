import { CategoriesRepository } from "../../repositories/PostgresCategoriesRepository"
import { GetCategoriesController } from "./get-categories.controller"
import { GetCategoriesUseCase } from "./get-categories.use-case"

const categoriesRepository = new CategoriesRepository()
const getCategoryUseCase = new GetCategoriesUseCase(categoriesRepository)
const getCategoryController = new GetCategoriesController(getCategoryUseCase)

export { getCategoryController }