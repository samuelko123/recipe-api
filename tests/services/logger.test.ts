process.env.TEST_SUITE = __filename

import { Logger } from '../../src/services'

describe('logger', () => {
  test('http', async () => {
    // Arrange
    const log_level = 'http'
    const message = `hello world - ${log_level}`
    const spy = {
      fn: jest.spyOn(Logger['_logger'], log_level)
    }

    // Action
    Logger[log_level](message)

    // Assert
    expect(spy.fn).toBeCalledTimes(1)
    expect(spy.fn).toBeCalledWith(message)
  })

  test('info', async () => {
    // Arrange
    const log_level = 'info'
    const message = `hello world - ${log_level}`
    const spy = {
      fn: jest.spyOn(Logger['_logger'], log_level)
    }

    // Action
    Logger[log_level](message)

    // Assert
    expect(spy.fn).toBeCalledTimes(1)
    expect(spy.fn).toBeCalledWith(message)
  })

  test('warn', async () => {
    // Arrange
    const log_level = 'warn'
    const message = `hello world - ${log_level}`
    const spy = {
      fn: jest.spyOn(Logger['_logger'], log_level)
    }

    // Action
    Logger[log_level](message)

    // Assert
    expect(spy.fn).toBeCalledTimes(1)
    expect(spy.fn).toBeCalledWith(message)
  })

  test('error', async () => {
    // Arrange
    const log_level = 'error'
    const message = `hello world - ${log_level}`
    const spy = {
      fn: jest.spyOn(Logger['_logger'], log_level)
    }

    // Action
    Logger[log_level](message)

    // Assert
    expect(spy.fn).toBeCalledTimes(1)
    expect(spy.fn).toBeCalledWith(message)
  })
})