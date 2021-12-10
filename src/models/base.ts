import { ObjectId } from 'mongodb'

abstract class BaseModel {
    abstract get name(): string
    abstract insert_one(data: object): object
    abstract find_one(id: ObjectId): object
    abstract update_one(id: ObjectId, data: object): object
    abstract delete_one(id: ObjectId): object
}

export { BaseModel }