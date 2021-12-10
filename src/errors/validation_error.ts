import { ErrorObject } from 'ajv'
import { HttpError } from './http_error'
import { HTTP_STATUS } from '../constants'

export class ValidationError extends HttpError {
    constructor(errors: ErrorObject[] | string | null | undefined) {
        super(HTTP_STATUS.BAD_REQUEST, errors ? (typeof errors === 'string' ? errors : JSON.stringify(errors)) : '')
        Object.setPrototypeOf(this, ValidationError.prototype)
        this.name = 'Validation Error'
    }
}