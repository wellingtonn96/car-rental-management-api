import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./create-specification.use-case";

export class CreateSpecificationController {
    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

    public handler(request: Request, response: Response): Response {
        try {
            const { name, description } = request.body
    
            this.createSpecificationUseCase.execute({ name, description })

            return response.status(201).json()
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }        
    }
}