import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/use-cases/create-specifications/create-specification.controller';
import { GetSpecificationsController } from '../modules/cars/use-cases/list-specifications/get-specifications.controller';

const createSpecificationController = new CreateSpecificationController();
const getSpecificationsController = new GetSpecificationsController();

const specificationRoutes = Router();

// @ts-ignore
specificationRoutes.post('/', createSpecificationController.handler);

// @ts-ignore
specificationRoutes.get('/', getSpecificationsController.handler);

export { specificationRoutes };
