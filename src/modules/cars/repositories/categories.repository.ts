import { Repository } from 'typeorm';

import { AppDataSource } from '../../../database/data-source';
import { Category } from '../entities/categories.entity';
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from './implementations/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category | null> {
    return this.repository.findOneBy({ name });
  }
}
