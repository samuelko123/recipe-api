import { HttpError } from './http_error'
import { HTTP_STATUS } from '../constants'

export class NotFoundError extends HttpError {
    constructor() {
        super(HTTP_STATUS.NOT_FOUND, 'Not Found')
        Object.setPrototypeOf(this, NotFoundError.prototype)
        this.name = 'Not Found Error'
    }
}