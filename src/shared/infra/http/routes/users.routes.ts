import { Router } from 'express';
import multer from 'multer';

import { AuthenticateUserController } from '@modules/accounts/use-cases/authenticate-user/authenticate-user.controller';
import { CreateUserController } from '@modules/accounts/use-cases/create-user/create-user.controller';
import { UpdateUserAvatarController } from '@modules/accounts/use-cases/update-user-avatar/update-user-avatar.controller';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensure-authenticated';

import uploadConfig from '../../../../config/upload';

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
