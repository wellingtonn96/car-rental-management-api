import bcrypt from 'bcrypt';

import { User } from '@modules/accounts/infra/typeorm/entities/user.entity';

import { ICreateUserDto, IUserRepository } from '../IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create(data: ICreateUserDto | User): Promise<void> {
    const user = new User();

    Object.assign(user, {
      ...data
    });

    this.users.push(user);
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
  updateAvatarById(id: string, newAvatarUrl: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex].avatar = newAvatarUrl;
    }
    return Promise.resolve();
  }
}
