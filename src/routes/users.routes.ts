import { Router } from 'express';
import { CreateUserController } from '../modules/accounts/use-cases/create-user/create-user.controller';
import { AuthenticateUserController } from '../modules/accounts/use-cases/authenticate-user/authenticate-user.controller';
import { UpdateUserAvatarController } from '../modules/accounts/use-cases/update-user-avatar/update-user-avatar.controller';
import uploadConfig from '../config/upload';
import multer from 'multer';
import ensureAuthenticated from '../modules/middlewares/ensure-authenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

// @ts-ignore
usersRoutes.post('/', createUserController.handle);

// @ts-ignore
usersRoutes.post('/auth', authenticateUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  // @ts-ignore
  updateUserAvatarController.handler
);

export { usersRoutes };
