import { Category } from "../../models/categories.model";
import { ICategoriesRepository } from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    findByName(name: string): Category {
        console.log(name)
       return null 
    }
    create({ name, description }): void {
        console.log(description)
        console.log(name)
        return null
    }
    list(): Category[] {
        return null
    }
}

export { CategoriesRepository }