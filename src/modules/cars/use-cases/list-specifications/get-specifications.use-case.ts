import { inject, injectable } from 'tsyringe';

import { ISpecificationRepository } from '@modules/cars/repositories/implementations/specification-repository.implementations';

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
