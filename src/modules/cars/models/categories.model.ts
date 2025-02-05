import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt?: Date;

  constructor({ name, description }: Category) {
    if (!this.id) {
      this.id = uuidV4();
    }
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
  }
}
