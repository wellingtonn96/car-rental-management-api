import { Router } from 'express';
import { CreateUserController } from '../modules/accounts/use-cases/create-user/create-user.controller';
import { AuthenticateUserController } from '../modules/accounts/use-cases/authenticate-user/authenticate-user.controller';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

// @ts-ignore
usersRoutes.post('/', createUserController.handle);

// @ts-ignore
usersRoutes.post('/auth', authenticateUserController.handle);

export { usersRoutes };
