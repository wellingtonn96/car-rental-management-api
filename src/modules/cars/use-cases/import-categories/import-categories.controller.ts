import { Request, Response } from "express";
import { ImportCategoriesUseCase } from "./import-categories.use-case";

class ImportCategoriesController {
    constructor (private importCategoriesUseCase: ImportCategoriesUseCase) {}

    public handler(request: Request, response: Response) {
        const { file } = request
        this.importCategoriesUseCase.execute(file)
        return response.status(200).json(file)
    }
}

export { ImportCategoriesController }