import { container } from 'tsyringe';

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { UsersRepository } from '@modules/accounts/repositories/users.repository';
import { CategoriesRepository } from '@modules/cars/repositories/categories.repository';
import { ICategoriesRepository } from '@modules/cars/repositories/implementations/ICategoriesRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/implementations/ISpecificationRepository';
import { SpecificationRepository } from '@modules/cars/repositories/specification.repository';
import { CreateCategoryUseCase } from '@modules/cars/use-cases/create-categories/create-categories.use-case';

// ICategriesRepository
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<CreateCategoryUseCase>(
  'CreateCategoryUseCase',
  CreateCategoryUseCase
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository
);
