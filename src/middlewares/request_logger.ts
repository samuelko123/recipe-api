import { Request, Response, NextFunction } from 'express'
import { Logger } from '../services'

export function request_logger (req: Request, res: Response, next: NextFunction) {
    Logger.http(`${req.method} ${req.url}`)
    next()
}