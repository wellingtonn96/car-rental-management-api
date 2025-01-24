import { Router } from 'express'
import { createCategoryController } from '../modules/cars/use-cases/create-categories'
import { getCategoryController } from '../modules/cars/use-cases/list-specifications'
import multer from 'multer'
import { importCategoryController } from '../modules/cars/use-cases/import-categories'

const upload = multer({
    dest: './tmp'
})

const categoriesRoutes = Router()

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response)
})

categoriesRoutes.get("/", (request, response) => {
    return getCategoryController.handle(request, response)
})

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handler(request, response)
})

export { categoriesRoutes }

