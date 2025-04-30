import 'reflect-metadata';
import { CategoryRepositoryInMemory } from '@modules/cars/repositories/in-memory/category-repository-in-memory';
import { AppError } from '@modules/errors/app-error';

import { CreateCategoryUseCase } from './create-categories.use-case';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory;

describe('Create Category use Case', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Test'
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty('name');
  });

  it('should not be able to create a category with name already exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category Test'
      };
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
