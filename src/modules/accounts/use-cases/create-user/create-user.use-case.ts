import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@modules/errors/app-error';

import {
  ICreateUserDto,
  IUserRepository
} from '../../repositories/IUserRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}
  async execute(data: ICreateUserDto) {
    const userExists = await this.userRepository.getUserByEmail(data.email);
    if (userExists) {
      throw new AppError('User already exists!');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword
    });

    return user;
  }
}

export { CreateUserUseCase };
