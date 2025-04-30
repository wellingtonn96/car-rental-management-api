import bcrypt from 'bcrypt';
import { Repository, UpdateResult } from 'typeorm';

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
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.repository.create({
      name,
      password: hashedPassword,
      driverLicense,
      email
    });

    await this.repository.save(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async updateAvatarById(id: string, newAvatarUrl: string): Promise<void> {
    await this.repository.update({ id }, { avatar: newAvatarUrl });
  }
}

export { UsersRepository };
