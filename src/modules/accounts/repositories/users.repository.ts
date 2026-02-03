import { Repository } from 'typeorm';

import { AppDataSource } from '../../../database/data-source';
import { User } from '../entities/user.entity';
import { ICreateUserDto, IUserRepository } from './IUserRepository';

class UsersRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    password,
    driverLicense,
    email
  }: ICreateUserDto): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      driverLicense,
      email
    });

    await this.repository.save(user);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = (await this.repository.findOneBy({ email })) || undefined;
    return user;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const user = (await this.repository.findOneBy({ id })) || undefined;
    return user;
  }

  async updateAvatarById(id: string, newAvatarUrl: string): Promise<void> {
    await this.repository.update({ id }, { avatar: newAvatarUrl });
  }
}

export { UsersRepository };
