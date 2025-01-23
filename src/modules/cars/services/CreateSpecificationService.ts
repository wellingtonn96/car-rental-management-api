import { ICreateSpecificationDTO, ISpecificationRepository } from "../repositories/ISpecificationRepository";

export class CreateSpecificationService {
    constructor (private specificationRepository: ISpecificationRepository) {}

    public execute({ description, name }: ICreateSpecificationDTO) {
        const existsSpecification = this.specificationRepository.findByName(name)
        if (existsSpecification) {
            throw new Error ('This specification already exists!')
        }
        this.specificationRepository.create({ description, name })
    }
}