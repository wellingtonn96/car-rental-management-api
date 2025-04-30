import { Specification } from '@modules/cars/entities/specification.entity';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  findByName(name: string): Promise<Specification | null>;
  list(): Promise<Specification[] | null>;
  create({ name, description }: ICreateSpecificationDTO): void;
}
