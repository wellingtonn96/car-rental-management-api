import { Specification } from '../models/specification.model';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository
} from './implementations/ISpecificationRepository';

export class SpecificationRepository implements ISpecificationRepository {
  private specification: Specification[];

  private static INSTANCE: SpecificationRepository;

  private constructor() {
    this.specification = [];
  }

  public static getInstance(): SpecificationRepository {
    if (!SpecificationRepository.INSTANCE) {
      SpecificationRepository.INSTANCE = new SpecificationRepository();
    }
    return SpecificationRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const category = new Specification({
      name,
      description
    });

    this.specification.push(category);
  }

  list() {
    return this.specification;
  }

  findByName(name: string): Specification {
    return this.specification.find((item) => item.name === name);
  }
}
