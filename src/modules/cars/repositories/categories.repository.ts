import { Category } from '../models/categories.model';
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from './implementations/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  // Padrão Singleton
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category({
      name,
      description
    });

    this.categories.push(category);
  }

  list() {
    return this.categories;
  }

  findByName(name: string): Category {
    return this.categories.find((item) => item.name === name);
  }
}
