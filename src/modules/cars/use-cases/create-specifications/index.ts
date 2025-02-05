import { SpecificationRepository } from '../../repositories/specification.repository';
import { CreateSpecificationController } from './create-specification.controller';
import { CreateSpecificationUseCase } from './create-specification.use-case';

const specificationsRepository = SpecificationRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

export { createSpecificationController };
