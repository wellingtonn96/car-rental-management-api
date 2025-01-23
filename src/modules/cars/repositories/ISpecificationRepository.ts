import { Specification } from "../models/specification.model"


export interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

export interface ISpecificationRepository {
      findByName(name: string): Specification
      list(): Specification[]
      create({name, description }: ICreateSpecificationDTO): void
}