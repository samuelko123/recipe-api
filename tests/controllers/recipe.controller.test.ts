process.env.TEST_SUITE = __filename

import { ObjectId } from 'mongodb'
import { RecipeController } from '../../src/controllers'
import { Validator } from '../../src/services'
import { ValidationError} from '../../src/errors'

describe('recipe controller', () => {
  const controller = new RecipeController()
  const id = new ObjectId('000000000000000000000000')
  const data = {
    name: 'apple pie',
    ingredients: [],
  }
  const update_data = {
    name: 'shephred pie'
  }

  describe('init_routes', () => {
    test('happy path', async () => {
      // Arrange
      const spy = {
        post: jest.spyOn(controller['_router'], 'post'),
        get: jest.spyOn(controller['_router'], 'get'),
        patch: jest.spyOn(controller['_router'], 'patch'),
        delete: jest.spyOn(controller['_router'], 'delete'),
      }

      // Action
      controller.init_routes()

      // Assert
      expect(spy.post).toBeCalledTimes(1)
      expect(spy.get).toBeCalledTimes(1)
      expect(spy.patch).toBeCalledTimes(1)
      expect(spy.delete).toBeCalledTimes(1)
    })
  })

  describe('insert_one', () => {
    test('happy path', async () => {
      // Arrange
      global.mock_req.body = data

      const spy = {
        validate:
          jest
            .spyOn(Validator, 'validate')
            .mockImplementation()
        ,
        insert_one:
          jest
            .spyOn(controller['_model'], 'insert_one')
            .mockImplementation((_) => {
              return Promise.resolve({
                acknowledged: true,
                insertedId: id,
              })
            })
        ,
        find_one:
          jest
            .spyOn(controller['_model'], 'find_one')
            .mockImplementation((_) => {
              return Promise.resolve({
                ...data,
                _id: id
              })
            })
      }

      // Action
      await controller.insert_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.validate).toBeCalledTimes(2)
      expect(spy.insert_one).toBeCalledWith(data)
      expect(spy.find_one).toBeCalledWith(id)

      expect(global.mock_next).toBeCalledTimes(0)
      expect(global.mock_res.send).toBeCalledWith({
        _id: id.toString(),
        ...data,
      })
    })

    test('error handling', async () => {
      // Arrange
      global.mock_req.body = data
      const err = new Error('test error')

      const spy = {
        validate:
          jest
            .spyOn(Validator, 'validate')
            .mockImplementation(() => {
              throw err
            })
        ,
        insert_one:
          jest.spyOn(controller['_model'], 'insert_one')
        ,
        find_one:
          jest.spyOn(controller['_model'], 'find_one')
      }

      // Action
      await controller.insert_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.validate).toBeCalledTimes(1)
      expect(spy.insert_one).toBeCalledTimes(0)
      expect(spy.find_one).toBeCalledTimes(0)

      expect(global.mock_res.send).toBeCalledTimes(0)
      expect(global.mock_next).toBeCalledWith(err)
    })
  })

  describe('find_one', () => {
    test('happy path', async () => {
      // Arrange
      global.mock_req.params.id = id.toString()

      const spy = {
        validate:
          jest.spyOn(Validator, 'validate')
        ,
        find_one:
          jest
            .spyOn(controller['_model'], 'find_one')
            .mockImplementation((_) => {
              return Promise.resolve({
                ...data,
                _id: id
              })
            })
      }

      // Action
      await controller.find_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.validate).toBeCalledTimes(1)
      expect(spy.find_one).toBeCalledWith(id)

      expect(global.mock_next).toBeCalledTimes(0)
      expect(global.mock_res.send).toBeCalledWith({
        _id: id.toString(),
        ...data,
      })
    })

    test('happy path - no record found', async () => {
      // Arrange
      global.mock_req.params.id = id.toString()

      const spy = {
        validate:
          jest.spyOn(Validator, 'validate')
        ,
        find_one:
          jest
            .spyOn(controller['_model'], 'find_one')
            .mockImplementation((_) => {
              return Promise.resolve(null)
            })
      }

      // Action
      await controller.find_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.find_one).toBeCalledWith(id)
      expect(spy.validate).toBeCalledTimes(0)

      expect(global.mock_next).toBeCalledTimes(0)
      expect(global.mock_res.send).toBeCalledWith({})
    })

    test('invalid id', async () => {
      // Arrange
      global.mock_req.params.id = 'invalid id'

      const spy = {
        validate:
          jest.spyOn(Validator, 'validate')
        ,
        find_one:
          jest.spyOn(controller['_model'], 'find_one')
      }

      // Action
      await controller.find_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.find_one).toBeCalledTimes(0)
      expect(spy.validate).toBeCalledTimes(0)
      expect(global.mock_res.send).toBeCalledTimes(0)

      expect(global.mock_next).toBeCalledWith(new ValidationError('id must be 24 hex characters'))
    })

    test('error handling', async () => {
      // Arrange
      global.mock_req.params.id = id.toString()
      const err = new Error('test error')

      const spy = {
        parse_object_id:
          jest
            .spyOn(controller, 'parse_object_id')
            .mockImplementation(() => {
              throw err
            })
        ,
        find_one:
          jest.spyOn(controller['_model'], 'find_one')
      }

      // Action
      await controller.find_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.parse_object_id).toBeCalledTimes(1)
      expect(spy.find_one).toBeCalledTimes(0)

      expect(global.mock_res.send).toBeCalledTimes(0)
      expect(global.mock_next).toBeCalledWith(err)
    })
  })

  describe('update_one', () => {
    test('happy path', async () => {
      // Arrange
      global.mock_req.params.id = id.toString()
      global.mock_req.body = update_data

      const spy = {
        validate:
          jest.spyOn(Validator, 'validate')
        ,
        update_one:
          jest
            .spyOn(controller['_model'], 'update_one')
            .mockImplementation((_) => {
              return Promise.resolve({
                ...data,
                ...update_data,
                _id: id
              })
            })
      }

      // Action
      await controller.update_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.validate).toBeCalledTimes(2)
      expect(spy.update_one).toBeCalledWith(id, update_data)

      expect(global.mock_next).toBeCalledTimes(0)
      expect(global.mock_res.send).toBeCalledWith({
        ...data,
        ...update_data,
        _id: id.toString(),
      })
    })

    test('happy path - no record found', async () => {
      // Arrange
      global.mock_req.params.id = id.toString()
      global.mock_req.body = update_data

      const spy = {
        validate:
          jest.spyOn(Validator, 'validate')
        ,
        update_one:
          jest
            .spyOn(controller['_model'], 'update_one')
            .mockImplementation((_) => {
              return Promise.resolve(null)
            })
      }

      // Action
      await controller.update_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.validate).toBeCalledTimes(1)
      expect(spy.update_one).toBeCalledWith(id, update_data)

      expect(global.mock_next).toBeCalledTimes(0)
      expect(global.mock_res.send).toBeCalledWith({})
    })

    test('error handling', async () => {
      // Arrange
      global.mock_req.params.id = id.toString()
      const err = new Error('test error')

      const spy = {
        parse_object_id:
          jest
            .spyOn(controller, 'parse_object_id')
            .mockImplementation(() => {
              throw err
            })
        ,
        update_one:
          jest.spyOn(controller['_model'], 'update_one')
      }

      // Action
      await controller.update_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.parse_object_id).toBeCalledTimes(1)
      expect(spy.update_one).toBeCalledTimes(0)

      expect(global.mock_res.send).toBeCalledTimes(0)
      expect(global.mock_next).toBeCalledWith(err)
    })
  })

  describe('delete_one', () => {
    test('happy path', async () => {
      // Arrange
      global.mock_req.params.id = id.toString()

      const spy = {
        validate:
          jest.spyOn(Validator, 'validate')
        ,
        delete_one:
          jest
            .spyOn(controller['_model'], 'delete_one')
            .mockImplementation((_) => {
              return Promise.resolve({
                ...data,
                _id: id
              })
            })
      }

      // Action
      await controller.delete_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.validate).toBeCalledTimes(1)
      expect(spy.delete_one).toBeCalledWith(id)

      expect(global.mock_next).toBeCalledTimes(0)
      expect(global.mock_res.send).toBeCalledWith({
        _id: id.toString(),
        ...data,
      })
    })

    test('happy path - no record found', async () => {
      // Arrange
      global.mock_req.params.id = id.toString()

      const spy = {
        validate:
          jest.spyOn(Validator, 'validate')
        ,
        delete_one:
          jest
            .spyOn(controller['_model'], 'delete_one')
            .mockImplementation((_) => {
              return Promise.resolve(null)
            })
      }

      // Action
      await controller.delete_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.delete_one).toBeCalledWith(id)
      expect(spy.validate).toBeCalledTimes(0)

      expect(global.mock_next).toBeCalledTimes(0)
      expect(global.mock_res.send).toBeCalledWith({})
    })

    test('error handling', async () => {
      // Arrange
      global.mock_req.params.id = id.toString()
      const err = new Error('test error')

      const spy = {
        parse_object_id:
          jest
            .spyOn(controller, 'parse_object_id')
            .mockImplementation(() => {
              throw err
            })
        ,
        delete_one:
          jest.spyOn(controller['_model'], 'delete_one')
      }

      // Action
      await controller.delete_one(global.mock_req, global.mock_res, global.mock_next)

      // Assert
      expect(spy.parse_object_id).toBeCalledTimes(1)
      expect(spy.delete_one).toBeCalledTimes(0)

      expect(global.mock_res.send).toBeCalledTimes(0)
      expect(global.mock_next).toBeCalledWith(err)
    })
  })
})