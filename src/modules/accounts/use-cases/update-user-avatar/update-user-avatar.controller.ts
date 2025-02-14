import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './update-user-avatar.use-case';

class UpdateUserAvatarController {
  async handler(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const avatarFile = request.file?.filename as string;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ userId, avatarFile });

    return response.status(204).json();
  }
}

export { UpdateUserAvatarController };
