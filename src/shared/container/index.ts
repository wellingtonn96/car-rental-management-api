import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/users.repository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/cars.repository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/categories.repository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/specification.repository';
import { ICarsRepository } from '@modules/cars/repositories/implementations/cars-repository.implementations';
import { ICategoriesRepository } from '@modules/cars/repositories/implementations/categories-repository.implementations';
import { ISpecificationRepository } from '@modules/cars/repositories/implementations/specification-repository.implementations';
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

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);
