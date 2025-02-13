import { inject, injectable } from 'tsyringe';
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
      throw new Error('User already exists!');
    }
    const user = await this.userRepository.create(data);

    return user;
  }
}

export { CreateUserUseCase };
