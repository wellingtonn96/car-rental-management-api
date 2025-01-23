import { Category } from "../models/categories.model";

export interface ICreateCategoryDTO {
    name: string;
    description: string
}

export interface ICategoriesRepository {
    findByName(name: string): Category
    list(): Category[]
    create({name, description }: ICreateCategoryDTO): void
}