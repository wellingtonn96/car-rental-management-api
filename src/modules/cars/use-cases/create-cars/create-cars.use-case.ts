import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/domain/entities/cars.entity';
import { ICreateCarsDto } from '@modules/cars/dto/create-cars.dto';
import { ICarsRepository } from '@modules/cars/repositories/implementations/cars-repository.implementations';
import { AppError } from '@shared/errors/app-error';

@injectable()
class CreateCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute(params: ICreateCarsDto): Promise<Car> {
    const carExists = await this.carsRepository.findByLicensePlate(
      params.licensePlate
    );

    if (carExists) {
      throw new AppError('Car already exists');
    }

    const car = new Car({
      ...params
    });

    const carCreated = await this.carsRepository.create(car);

    return carCreated;
  }
}

export { CreateCarsUseCase };
