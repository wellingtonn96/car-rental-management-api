import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { ICar } from '@modules/cars/domain/entities/cars.entity';

@Entity('cars')
export class Car implements ICar {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'daily_rate' })
  dailyRate: number;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @Column({ type: 'varchar', length: 10, unique: true, name: 'license_plate' })
  licensePlate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'fine_amount' })
  fineAmount: number;

  @Column({ type: 'varchar', length: 50 })
  brand: string;

  @Column({ type: 'uuid', name: 'category_id' })
  categoryId: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true, name: 'updated_at' })
  updatedAt?: Date;
}
