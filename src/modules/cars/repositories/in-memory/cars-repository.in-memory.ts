import { v4 as uuid } from 'uuid';

import { Car } from '@modules/cars/domain/entities/cars.entity';
import { ICreateCarsDto } from '@modules/cars/dto/create-cars.dto';

import { ICarsRepository } from '../implementations/cars-repository.implementations';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  constructor() {}

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    available,
    brand,
    categoryId
  }: ICreateCarsDto): Promise<Car> {
    const data = {
      id: uuid(),
      name,
      description,
      dailyRate,
      available,
      licensePlate,
      fineAmount,
      brand,
      categoryId
    };

    this.cars.push(data);

    return data;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    return this.cars.find((car) => car.licensePlate === licensePlate) || null;
  }

  async findById(id: string): Promise<Car | null> {
    throw new Error('Method not Implemented');
  }

  async listAvailable(): Promise<Car[]> {
    throw new Error('Method not Implemented');
  }
  async update(id: string, data: Partial<ICreateCarsDto>): Promise<Car> {
    throw new Error('Method not Implemented');
  }
  async delete(id: string): Promise<void> {
    throw new Error('Method not Implemented');
  }
}
