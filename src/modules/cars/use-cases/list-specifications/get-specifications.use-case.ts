import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '../../repositories/implementations/ISpecificationRepository';

@injectable()
export class GetSpecificationsUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}
  public async execute() {
    return this.specificationsRepository.list();
  }
}
