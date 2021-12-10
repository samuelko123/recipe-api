import { Request, Response } from 'express'
import path from 'path'
import { Database } from '../../src/services'

beforeAll(async () => {
    // create separate db for each test suite
    const db_name = 'db-' + path.basename(process.env.TEST_SUITE).split('.').join('-')
    const uri = process.env.MONGO_URI_TEST.replace('?', db_name + '?')

    // connect to db
    await Database.connect(uri)
})

beforeEach(async () => {
    // clear db
    const collections = await Database['_db'].listCollections().toArray()
    const coll_names = collections.map(x => x.name)
    for (const coll_name of coll_names) {
        await Database['_db'].collection(coll_name).deleteMany({})
    }

    // mock request
    global.mock_req = {
        query: {},
        params: {},
        body: {},
        session: {},
    } as unknown as Request

    // mock response
    global.mock_res = {
        send: jest.fn(),
        status: jest.fn().mockImplementation(() => { return global.mock_res }),
        json: jest.fn(),
    } as unknown as Response

    // mock next function
    global.mock_next = jest.fn()
})

afterAll(async () => {
    // disconnect from db
    await Database['_client'].close()
})