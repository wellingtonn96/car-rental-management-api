import { SpecificationRepository } from '../../repositories/specification.repository';
import { GetSpecificationsController } from './get-categories.controller';
import { GetSpecificationsUseCase } from './get-categories.use-case';

const specificationsRepository = SpecificationRepository.getInstance();
const getSpecificationsUseCase = new GetSpecificationsUseCase(
  specificationsRepository
);
const getSpecificationsController = new GetSpecificationsController(
  getSpecificationsUseCase
);

export { getSpecificationsController };
