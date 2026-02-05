import { v4 as uuidV4 } from 'uuid';

export interface ICar {
  id?: string; // sempre presente após criação
  name: string;
  description: string;
  dailyRate: number;
  available: boolean;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Car implements ICar {
  id?: string;
  name: string;
  description: string;
  dailyRate: number;
  available: boolean;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: ICar) {
    this.id = uuidV4();
    this.name = data.name;
    this.description = data.description;
    this.dailyRate = data.dailyRate;
    this.available = data.available;
    this.licensePlate = data.licensePlate;
    this.fineAmount = data.fineAmount;
    this.brand = data.brand;
    this.categoryId = data.categoryId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
