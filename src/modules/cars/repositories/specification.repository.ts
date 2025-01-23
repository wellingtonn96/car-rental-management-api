import { Specification } from "../models/specification.model";
import { ICreateSpecificationDTO, ISpecificationRepository } from "./ISpecificationRepository";

export class SpecificationRepository implements ISpecificationRepository {
    private specification: Specification[]

    constructor() {
        this.specification = []
    }
    
    create({ name, description }: ICreateSpecificationDTO): void {
        const category = new Specification({
            name,
            description,
        })

        this.specification.push(category)
    }

    list() {
        return this.specification
    }

    findByName(name: string): Specification {
        return this.specification.find(item => item.name === name)
    }
}