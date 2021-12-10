import 'dotenv/config' // load from .env file to process.env

import { App } from './app'
import { Database, Logger, Validator } from './services'
import { ProcessEnvSchema } from './schemas'

class Server {
    static async start() {
        try {
            Logger.info('Checking env variables')
            const env = Validator.validate(ProcessEnvSchema, process.env)

            Logger.info('Connecting to database')
            if (env.NODE_ENV === 'production') {
                await Database.connect(env.MONGO_URI_PROD)
            } else {
                await Database.connect(env.MONGO_URI_DEV)
            }

            Logger.info('Starting app')
            const app = new App()
            app.route()
            app.start(env.PORT)
        } catch (err) {
            Logger.error(err);
        }
    }
}

Server.start()