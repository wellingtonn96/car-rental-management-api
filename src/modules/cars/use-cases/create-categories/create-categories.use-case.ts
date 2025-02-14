import { inject, injectable } from 'tsyringe';
import {
  ICategoriesRepository,
  ICreateCategoryDTO
} from '../../repositories/implementations/ICategoriesRepository';
import { AppError } from '../../../errors/app-error';

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}
  public async execute({ description, name }: ICreateCategoryDTO) {
    const existsCategory = await this.categoriesRepository.findByName(name);

    if (existsCategory) {
      throw new AppError('category already exists!');
    }

    return this.categoriesRepository.create({ name, description });
  }
}
