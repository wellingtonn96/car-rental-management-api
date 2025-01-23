import { Category } from "../models/categories.model";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[]

    constructor() {
        this.categories = []
    }
    
    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category({
            name,
            description,
        })

        this.categories.push(category)
    }

    list() {
        return this.categories
    }

    findByName(name: string): Category {
        return this.categories.find(item => item.name === name)
    }
}