import { NextFunction, Request, Response } from 'express'
import { Logger } from '../services'
import { HTTP_STATUS } from '../constants'
import { HttpError } from '../errors'

export function error_handler(err: Error, req: Request, res: Response, next: NextFunction) {
    const http_err = err as HttpError
    if (!(err instanceof HttpError)){
         http_err.status = HTTP_STATUS.SERVER_ERROR
    }
    
    try {
        if (http_err.status >= 500 && http_err.status < 600) {
            Logger.error(http_err)
        } else {
            Logger.warn(http_err)
        }
    } catch (new_err) {
        Logger.error(new_err)
    }

    res
        .status(http_err.status)
        .json({ error: http_err.message })
}