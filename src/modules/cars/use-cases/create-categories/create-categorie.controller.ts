import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./create-categorie.use-case";

export class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase){}
    public handle(request: Request, response: Response): Response {    
        try {
            const { name, description } = request.body

            this.createCategoryUseCase.execute({ name, description })

            return response.status(201).json()
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }
}