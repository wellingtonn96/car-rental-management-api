import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/use-cases/create-specifications';
import { getSpecificationsController } from '../modules/cars/use-cases/list-categories';

const specificationRoutes = Router();

specificationRoutes.post('/', (request, response) => {
  return createSpecificationController.handler(request, response);
});

specificationRoutes.get('/', (request, response) => {
  return getSpecificationsController.handle(request, response);
});

export { specificationRoutes };
