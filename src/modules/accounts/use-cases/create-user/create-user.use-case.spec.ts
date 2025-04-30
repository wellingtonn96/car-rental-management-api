import { AppError } from '@modules/errors/app-error';

import { UserRepositoryInMemory } from '../../repositories/in-memory/user-repository-in-memory';
import { ICreateUserDto } from '../../repositories/IUserRepository';
import { AuthenticateUserUseCase } from '../authenticate-user/authenticate-user.use-case';
import { CreateUserUseCase } from './create-user.use-case';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe('Authenticate User use Case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an existing user', async () => {
    const user: ICreateUserDto = {
      driverLicense: '123456789',
      email: 'user@teste.com',
      password: '1234565',
      name: 'User Test'
    };

    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an non-existing user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'incorrect_email@email.com',
        password: '1234565'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDto = {
        driverLicense: '123456789',
        email: 'user@teste.com',
        password: '1234565',
        name: 'User Test'
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect_password'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
