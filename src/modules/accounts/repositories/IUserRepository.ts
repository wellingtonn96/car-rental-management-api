import { User } from '../entities/user.entity';

interface ICreateUserDto {
  name: string;
  password: string;
  driverLicense: string;
  email: string;
}

interface IUserRepository {
  create(data: ICreateUserDto): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
}

export { ICreateUserDto, IUserRepository };
