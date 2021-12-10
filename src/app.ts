import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { Logger } from './services'
import {
    error_handler,
    request_logger,
    not_found_handler,
} from './middlewares'
import * as controllers from './controllers'

export class App {
    private _app: Application

    constructor() {
        this._app = express()
        this.config()
    }

    private config() {
        this._app.use(helmet())
        this._app.use(cors())
        this._app.use(express.urlencoded({ extended: false }))
        this._app.use(express.json())
        this._app.enable('trust proxy')
        this._app.set('json spaces', 4)
    }

    route() {
        this._app.use(request_logger)
        for (const Controller of Object.values(controllers)) {
            const c = new Controller()
            this._app.use('/api', c.init_routes())
        }
        this._app.use(not_found_handler)
        this._app.use(error_handler)
    }

    start(port: number) {
        this._app.listen(port, () => {
            Logger.info(`Listening on port ${port}`)
        })
    }
}