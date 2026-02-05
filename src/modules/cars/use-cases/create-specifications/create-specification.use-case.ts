import { inject, injectable } from 'tsyringe';

import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from '@modules/cars/repositories/implementations/specification-repository.implementations';
import { AppError } from '@shared/errors/app-error';

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  public async execute({
    description,
    name
  }: ICreateSpecificationDTO): Promise<void> {
    const existsSpecification = await this.specificationRepository.findByName(
      name
    );
    if (existsSpecification) {
      throw new AppError('This specification already exists!');
    }
    this.specificationRepository.create({ description, name });
  }
}
