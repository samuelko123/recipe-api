process.env.TEST_SUITE = __filename

import { not_found_handler } from '../../src/middlewares'
import { NotFoundError } from '../../src/errors'

describe('not found handler', () => {
  test('happy path', async () => {
    // Action
    not_found_handler(global.mock_req, global.mock_res, global.mock_next)

    // Assert
    expect(global.mock_next).toBeCalledWith(new NotFoundError)
  })
})