import { container } from 'tsyringe';

import { CategoriesRepository } from '../../cars/repositories/categories.repository';
import { ICategoriesRepository } from '../../cars/repositories/implementations/ICategoriesRepository';
import { CreateCategoryUseCase } from '../../cars/use-cases/create-categories/create-categories.use-case';
import { ISpecificationRepository } from '../../cars/repositories/implementations/ISpecificationRepository';
import { SpecificationRepository } from '../../cars/repositories/specification.repository';
import { IUserRepository } from '../../accounts/repositories/IUserRepository';
import { UsersRepository } from '../../accounts/repositories/users.repository';

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
