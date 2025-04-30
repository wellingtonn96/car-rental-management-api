import { Repository } from 'typeorm';

import { AppDataSource } from '../../../database/data-source';
import { Specification } from '../entities/specification.entity';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from './implementations/ISpecificationRepository';

export class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO) {
    const category = this.repository.create({
      name,
      description
    });

    await this.repository.save(category);
  }

  async list(): Promise<Specification[] | null> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Specification | null> {
    return this.repository.findOneBy({ name });
  }
}
