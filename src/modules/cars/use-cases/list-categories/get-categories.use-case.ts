import { ISpecificationRepository } from "../../repositories/implementations/ISpecificationRepository";

export class GetSpecificationsUseCase {
    constructor (private specificationsRepository: ISpecificationRepository) {}
    public execute() {
        return this.specificationsRepository.list()
    }
}