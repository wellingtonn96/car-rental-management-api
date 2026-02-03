import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/user-repository-in-memory';
import { AppError } from '@shared/errors/app-error';

import { AuthenticateUserUseCase } from '../authenticate-user/authenticate-user.use-case';
import { CreateUserUseCase } from './create-user.use-case';

let userRepositoryInMomory: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User use Case', () => {
  beforeEach(() => {
    userRepositoryInMomory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMomory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMomory);
  });

  it('should be able to authenticate an existing user', async () => {
    const user = {
      name: 'wellington',
      password: 'admin',
      driverLicense: 'minha licensa',
      email: 'admin@mail.com'
    };

    const authUser = {
      email: 'admin@mail.com',
      password: 'admin'
    };

    await createUserUseCase.execute(user);

    const authenticateUser = await authenticateUserUseCase.execute(authUser);

    expect(authenticateUser).toHaveProperty('token');
  });

  it('should not be able to authenticate an non-existing user', async () => {
    const authNonExistUser = {
      email: 'false@mail.com',
      password: 'admin'
    };
    expect(async () => {
      const authenticateUser = await authenticateUserUseCase.execute(
        authNonExistUser
      );
      console.log(authenticateUser);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with incorrect password', async () => {
    expect(async () => {
      const user = {
        name: 'wellington',
        password: 'admin',
        driverLicense: 'minha licensa',
        email: 'admin@mail.com'
      };

      const authUser = {
        email: 'admin@mail.com',
        password: 'admin123'
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute(authUser);
    }).rejects.toBeInstanceOf(AppError);
  });
});
