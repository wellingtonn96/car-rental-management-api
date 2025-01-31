import { CategoriesRepository } from "../../repositories/categories.repository"
import { GetCategoriesController } from "./get-specifications.controller"
import { GetCategoriesUseCase } from "./get-specifications.use-case"

const categoriesRepository = CategoriesRepository.getInstance()
const getCategoryUseCase = new GetCategoriesUseCase(categoriesRepository)
const getCategoryController = new GetCategoriesController(getCategoryUseCase)

export { getCategoryController }