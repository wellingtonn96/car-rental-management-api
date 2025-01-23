import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export class GetCategoriesUseCase {
    constructor (private categoriesRepository: ICategoriesRepository) {}
    public execute() {
        return this.categoriesRepository.list()
    }
}