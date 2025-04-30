import { inject, injectable } from 'tsyringe';

import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from '@modules/cars/repositories/implementations/ICategoriesRepository';
import { AppError } from '@modules/errors/app-error';

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  public async execute({
    description,
    name
  }: ICreateCategoryDTO): Promise<void> {
    const existsCategory = await this.categoriesRepository.findByName(name);

    if (existsCategory) {
      throw new AppError('category already exists!');
    }

    return this.categoriesRepository.create({ name, description });
  }
}
