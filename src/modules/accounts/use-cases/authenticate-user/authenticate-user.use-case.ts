import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/IUserRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../../errors/app-error';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new AppError('Email or Password incorrect!');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Email or Password incorrect!');
    }

    const authUser = {
      email: user.email,
      name: user.name
    };

    const userToken = sign(authUser, 'c3324856b2b582d2cd445d9c54ed4197', {
      subject: user.id,
      expiresIn: '1d'
    });

    return {
      user: authUser,
      token: userToken
    };
  }
}

export { AuthenticateUserUseCase };
