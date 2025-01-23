import { Router } from 'express'
import { SpecificationRepository } from '../modules/cars/repositories/specification.repository'
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService'

const specificationRoutes = Router()

const specificationRepository = new SpecificationRepository()

specificationRoutes.post("/", (request, response) => {
    try {
        const { name, description } = request.body

        const categoryService = new CreateSpecificationService(specificationRepository)

        categoryService.execute({ name, description })
        
        return response.status(201).json()
    } catch (error) {
        return response.status(400).json({ error: error.message })
    }
})

// specificationRoutes.get("/", (request, response) => {
//     try {
//         const specificationService = new GetspecificationService(specificationRepository)
//         const specificationList = specificationService.execute()
//         return response.status(400).json(specificationList)
//     } catch (error) {
//         return response.status(400).json({ error: error.message })
//     }
// })

export { specificationRoutes }

