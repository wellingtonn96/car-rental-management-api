import { Router } from 'express'
import { createCategoryController } from '../modules/cars/use-cases/create-categories'
import { getCategoryController } from '../modules/cars/use-cases/list-categories'

const categoriesRoutes = Router()

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response)
})

categoriesRoutes.get("/", (request, response) => {
    return getCategoryController.handle(request, response)
})

export { categoriesRoutes }

