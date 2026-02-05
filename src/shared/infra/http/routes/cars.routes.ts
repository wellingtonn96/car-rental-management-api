import { Router } from 'express';

import { CreateCarsController } from '@modules/cars/use-cases/create-cars/create-cars.controller';

import ensureAuthenticated from '../middlewares/ensure-authenticated';

const carsRoutes = Router();

const createCarsController = new CreateCarsController();

carsRoutes.use(ensureAuthenticated);

// @ts-ignore
carsRoutes.post('/', createCarsController.handler);

export { carsRoutes };
