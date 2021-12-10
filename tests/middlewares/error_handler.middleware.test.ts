process.env.TEST_SUITE = __filename

import { error_handler } from '../../src/middlewares'
import { Logger } from '../../src/services'
import { ValidationError } from '../../src/errors'

describe('error handler', () => {
  test('server error', async () => {
    // Arrange
    const err = new Error('Testing')
    const spy = {
      fn: jest.spyOn(Logger, 'error')
    }

    // Action
    error_handler(err, global.mock_req, global.mock_res, global.mock_next)

    // Assert
    expect(spy.fn).toBeCalledWith(err)
  })

  test('validation error', async () => {
    // Arrange
    const err = new ValidationError(null)
    const spy = {
      fn: jest.spyOn(Logger, 'warn')
    }

    // Action
    error_handler(err, global.mock_req, global.mock_res, global.mock_next)

    // Assert
    expect(spy.fn).toBeCalledWith(err)
  })

  test('unexpected error in error handler', async () => {
    // Arrange
    const err = new ValidationError(null)
    const err_unexpected = new Error('Testing Unexpected')

    const spy = {
      warn: jest.spyOn(Logger, 'warn').mockImplementation(() => { throw err_unexpected }),
      error: jest.spyOn(Logger, 'error'),
    }

    // Action
    error_handler(err, global.mock_req, global.mock_res, global.mock_next)

    // Assert
    expect(spy.warn).toBeCalledWith(err)
    expect(spy.error).toBeCalledWith(err_unexpected)
  })
})