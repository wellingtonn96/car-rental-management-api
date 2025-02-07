import { inject, injectable } from 'tsyringe';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from '../../repositories/implementations/ISpecificationRepository';

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  public async execute({ description, name }: ICreateSpecificationDTO) {
    const existsSpecification = await this.specificationRepository.findByName(
      name
    );
    if (existsSpecification) {
      throw new Error('This specification already exists!');
    }
    this.specificationRepository.create({ description, name });
  }
}
