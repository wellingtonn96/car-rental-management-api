import { Repository } from 'typeorm';

import { ICreateCarsDto } from '@modules/cars/dto/create-cars.dto';
import { ICarsRepository } from '@modules/cars/repositories/implementations/cars-repository.implementations';
import { AppDataSource } from '@shared/database/data-source';
import { AppError } from '@shared/errors/app-error';

import { Car } from '../entities/cars.entity';

export class CarsRepository implements ICarsRepository {
  private readonly repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create(data: ICreateCarsDto): Promise<Car> {
    const car = this.repository.create({
      ...data,
      available: data.available ?? true
    });

    return this.repository.save(car);
  }

  async findById(id: string): Promise<Car | null> {
    return this.repository.findOneBy({ id });
  }

  async findByLicensePlate(licensePlate: string): Promise<Car | null> {
    return this.repository.findOneBy({ licensePlate });
  }

  async listAvailable(): Promise<Car[]> {
    return this.repository.find({
      where: { available: true }
    });
  }

  async update(id: string, data: Partial<ICreateCarsDto>): Promise<Car> {
    const car = await this.findById(id);
    if (!car) {
      throw new AppError('Carro não encontrado'); // ou AppError
    }

    Object.assign(car, data);
    return this.repository.save(car);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}
