import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'driver_license' })
  driverLicense: string;

  @Column({ name: 'isAdmin' })
  isAdmin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  constructor() {
    this.id = uuidV4();
  }
}
