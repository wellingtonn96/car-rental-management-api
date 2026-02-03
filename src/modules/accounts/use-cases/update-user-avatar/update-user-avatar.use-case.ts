import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/app-error';

import { deleteFile } from '../../../../utils/file';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}
  async execute({ userId, avatarFile }: IRequest) {
    const user = await this.userRepository.getUserById(userId);

    if (user?.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    if (!user) throw new AppError('failed to find user');

    user.avatar = avatarFile;

    await this.userRepository.updateAvatarById(userId, avatarFile);
  }
}

export { UpdateUserAvatarUseCase };
