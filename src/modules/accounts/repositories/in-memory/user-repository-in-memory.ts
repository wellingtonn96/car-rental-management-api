import bcrypt from 'bcrypt';

import { User } from '@modules/accounts/entities/user.entity';

import { ICreateUserDto, IUserRepository } from '../IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create(data: ICreateUserDto | User): Promise<void> {
    const user = new User();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    Object.assign(user, { ...data, password: hashedPassword });
    this.users.push(user);
    return Promise.resolve();
  }
  getUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return Promise.resolve(null);
    }
    return Promise.resolve(user);
  }

  getUserById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return Promise.resolve(null);
    }
    return Promise.resolve(user);
  }
  updateAvatarById(id: string, newAvatarUrl: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex].avatar = newAvatarUrl;
    }
    return Promise.resolve();
  }
}
