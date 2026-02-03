import 'reflect-metadata';
import { CategoryRepositoryInMemory } from '@modules/cars/repositories/in-memory/category-repository-in-memory';
import { AppError } from '@modules/errors/app-error';

import { CreateCategoryUseCase } from './create-categories.use-case';

let createCategoryUseCase: CreateCategoryUseCase;
let createRepositoryInMomory: CategoryRepositoryInMemory;

describe('Create Category use Case', () => {
  beforeEach(() => {
    createRepositoryInMomory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(createRepositoryInMomory);
  });

  it('shoul be able to create a new category', async () => {
    const category = {
      description: 'categoria nova',
      name: 'name-category-01'
    };
    await createCategoryUseCase.execute(category);

    const getCategoryCreated = await createRepositoryInMomory.findByName(
      category.name
    );
    expect(getCategoryCreated).toHaveProperty('id');
  });

  it('should not be abel to create a new category with name exists', async () => {
    const category = {
      description: 'categoria nova',
      name: 'name-category-01'
    };

    expect(async () => {
      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
