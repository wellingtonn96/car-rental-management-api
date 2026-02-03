import { Category } from '@modules/cars/infra/typeorm/entities/categories.entity';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category | null>;
  list(): Promise<Category[] | null>;
  create({ name, description }: ICreateCategoryDTO): void;
}
