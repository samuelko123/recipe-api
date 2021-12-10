import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '../errors'

export function not_found_handler (req: Request, res: Response, next: NextFunction) {
    next(new NotFoundError())
}