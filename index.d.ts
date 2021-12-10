import { MongoMemoryReplSet } from 'mongodb-memory-server'
import { Request, Response, NextFunction } from 'express'

declare global {
    var mongod: MongoMemoryReplSet
    var mock_req: Request
    var mock_res: Response
    var mock_next: NextFunction

    namespace NodeJS {
        interface ProcessEnv {
            TEST_SUITE: string
            MONGO_URI_TEST: string
        }
    }
}