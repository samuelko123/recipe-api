process.env.TEST_SUITE = __filename

import { ProcessEnvSchema } from '../../src/schemas'
import { Validator } from '../../src/services'
import * as schemas from '../../src/schemas'

describe('validator', () => {
  test('init', async () => {
    // Arrange
    const spy = {
      fn: jest.spyOn(Validator['_ajv'], 'compile')
    }

    // Action
    Validator.init()

    // Assert
    expect(spy.fn).toBeCalledTimes(Object.values(schemas).length)
  })

  test('valid data - should return object', async () => {
    // Arrange
    const data = {
      PORT: 8000,
      MONGO_URI_DEV: 'test',
      MONGO_URI_PROD: 'test',
    }

    // Action
    const res = Validator.validate(ProcessEnvSchema, data)

    // Assert
    expect(res).toEqual(data)
  })

  test('invalid data - should throw error', async () => {
    // Arrange
    const data = {
      invalid_field: 'invalid value'
    }

    // Action
    const action = () => {
      Validator.validate(ProcessEnvSchema, data)
    }

    // Assert
    expect(action).toThrow()
  })
})