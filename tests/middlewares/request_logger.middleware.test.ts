process.env.TEST_SUITE = __filename

import { request_logger } from '../../src/middlewares'
import { Logger } from '../../src/services'

describe('request logger handler', () => {
  test('happy path', async () => {
    // Arrange
    const spy = {
      fn: jest.spyOn(Logger, 'http').mockImplementation()
    }

    // Action
    request_logger(global.mock_req, global.mock_res, global.mock_next)

    // Assert
    expect(spy.fn).toBeCalledTimes(1)
    expect(global.mock_next).toBeCalledTimes(1)
  })
})