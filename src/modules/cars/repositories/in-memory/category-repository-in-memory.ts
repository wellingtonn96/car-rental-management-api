import { Category } from '../../entities/categories.entity';
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from '../implementations/ICategoriesRepository';

export class CategoryRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO) {
    const category = { name, description };
    this.categories.push(category);
    return category;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name);
    if (!category) {
      return null;
    }
    return category;
  }

  async list() {
    return this.categories;
  }
}
