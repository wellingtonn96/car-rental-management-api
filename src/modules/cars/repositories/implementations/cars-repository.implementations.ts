import { Car } from '@modules/cars/domain/entities/cars.entity';
import { ICreateCarsDto } from '@modules/cars/dto/create-cars.dto';

export interface ICarsRepository {
  create(params: ICreateCarsDto): Promise<Car>;
  findById(id: string): Promise<Car | null>;
  findByLicensePlate(licensePlate: string): Promise<Car | null>;
  listAvailable(): Promise<Car[]>;
  update(id: string, data: Partial<ICreateCarsDto>): Promise<Car>;
  delete(id: string): Promise<void>;
}
