import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/implementations/categories-repository.implementations';

@injectable()
export class GetCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}
  public async execute() {
    return this.categoriesRepository.list();
  }
}
