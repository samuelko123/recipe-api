process.env.TEST_SUITE = __filename

import { ObjectId } from 'mongodb'
import { RecipeModel } from '../../src/models'
import * as services from '../../src/services'

jest.mock('../../src/services')

describe('recipe model', () => {
  const model = new RecipeModel()
  const id = new ObjectId('000000000000000000000000')
  const data = {
    name: 'apple pie',
    ingredients: [],
    steps: [],
  }

  test('get name', async () => {
    expect(model.name).toEqual('recipes')
  })

  test('insert_one', async () => {
    // Action
    await model.insert_one(data)

    // Assert
    expect(services.Database.insert_one).toBeCalledWith('recipes', data)
  })

  test('find_one', async () => {
    // Action
    await model.find_one(id)

    // Assert
    expect(services.Database.find_one).toBeCalledWith('recipes', id)
  })

  test('update_one', async () => {
    // Action
    await model.update_one(id, data)

    // Assert
    expect(services.Database.update_one).toBeCalledWith('recipes', id, data)
  })

  test('delete_one', async () => {
    // Action
    await model.delete_one(id)

    // Assert
    expect(services.Database.delete_one).toBeCalledWith('recipes', id)
  })
})