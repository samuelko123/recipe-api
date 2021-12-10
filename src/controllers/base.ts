import { ValidationError } from '../errors'
import { Router } from 'express'
import { ObjectId, WithId, Document } from 'mongodb'

abstract class BaseController {
    abstract init_routes(): Router

    parse_object_id(id: string): ObjectId {
        const regex = /^[a-fA-F0-9]{24}$/i

        if(!regex.test(id)){
            throw new ValidationError('id must be 24 hex characters')
        }
        return new ObjectId(id)
    }

    stringify_object_id(doc: WithId<Document> | Document | null): object {
        if (!doc) {
            return {}
        } else {
            return {
                ...doc,
                _id: doc._id.toString()
            }
        }
    }
}

export { BaseController }