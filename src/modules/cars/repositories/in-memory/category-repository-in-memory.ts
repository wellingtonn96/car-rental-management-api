import { v4 as uuidV4 } from 'uuid';

import { Category } from '../../infra/typeorm/entities/categories.entity';
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from '../implementations/categories-repository.implementations';

export class CategoryRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO) {
    const category = { id: uuidV4(), name, description };
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
