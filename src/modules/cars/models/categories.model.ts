import { v4 as uuidV4 } from "uuid";

export class Category {
    id?: string;
    name: string;
    description: string
    createdAt?: Date

    constructor({
        name,
        description,
    }: Category) {
        if(!this.id){
            this.id = uuidV4()
        }
        this.name = name
        this.description = description
        this.createdAt = new Date()
    }
}