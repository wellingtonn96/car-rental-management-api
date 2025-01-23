import { ICategoriesRepository, ICreateCategoryDTO } from "../../repositories/ICategoriesRepository";

export class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository){}
    public execute({ description, name }: ICreateCategoryDTO) {    
        const existsCategory = this.categoriesRepository.findByName(name)
    
        if (existsCategory) {
            throw new Error('category already exists!')
        }
    
        return this.categoriesRepository.create({ name, description })
    }
}