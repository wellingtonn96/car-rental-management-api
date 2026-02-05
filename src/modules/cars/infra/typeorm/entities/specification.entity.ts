import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('specifications')
export class Specification {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  constructor() {
    this.id = uuidV4();
  }
}
