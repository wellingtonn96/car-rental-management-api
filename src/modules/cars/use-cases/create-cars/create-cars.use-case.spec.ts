import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/cars-repository.in-memory';
import { AppError } from '@shared/errors/app-error';

import { CreateCarsUseCase } from './create-cars.use-case';

let createCarUseCase: CreateCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Chevrolet Onix Plus Premier',
      description:
        'Sedan premium, motor 1.0 turbo, 6 airbags, chave presencial',
      dailyRate: 149.0,
      licensePlate: 'DEF4G67',
      fineAmount: 300.0,
      available: false,
      brand: 'Chevrolet',
      categoryId: 'category-uuid-002'
    });

    expect(car).toHaveProperty('id');
  });

  it('should be not able to register a car with same car plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Chevrolet Onix Plus Premier',
        description:
          'Sedan premium, motor 1.0 turbo, 6 airbags, chave presencial',
        dailyRate: 149.0,
        licensePlate: 'DEF4G67',
        fineAmount: 300.0,
        available: false,
        brand: 'Chevrolet',
        categoryId: 'category-uuid-002'
      });

      await createCarUseCase.execute({
        name: 'Chevrolet Onix Plus Premier',
        description:
          'Sedan premium, motor 1.0 turbo, 6 airbags, chave presencial',
        dailyRate: 149.0,
        licensePlate: 'DEF4G67',
        fineAmount: 300.0,
        available: false,
        brand: 'Chevrolet',
        categoryId: 'category-uuid-002'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
