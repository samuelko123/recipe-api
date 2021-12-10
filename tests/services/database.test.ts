process.env.TEST_SUITE = __filename

import { ObjectId } from 'mongodb'
import { Database } from '../../src/services'

describe('database', () => {
  test('insert_one', async () => {
    // Arrange
    const collection_name = 'test'
    const data = { hello: 'world' }

    // Action
    const res = await Database.insert_one(collection_name, data)

    // Assert
    expect(res).toEqual({
      acknowledged: true,
      insertedId: expect.any(ObjectId)
    })
  })

  test('find_one', async () => {
    // Arrange
    const collection_name = 'test'
    const data = { hello: 'world' }
    const { insertedId } = await Database.insert_one(collection_name, data)

    // Action
    const res = await Database.find_one(collection_name, insertedId)

    // Assert
    expect(res).toEqual({
      _id: insertedId,
      ...data
    })
  })

  test('find_one - no record found', async () => {
    // Arrange
    const collection_name = 'test'
    const id = new ObjectId('000000000000000000000000')

    // Action
    const res = await Database.find_one(collection_name, id)

    // Assert
    expect(res).toEqual(null)
  })

  test('update_one', async () => {
    // Arrange
    const collection_name = 'test'
    const data = { hello: 'world' }
    const { insertedId } = await Database.insert_one(collection_name, data)
    const new_data = {hello: 'new world'}

    // Action
    const res = await Database.update_one(collection_name, insertedId, new_data)

    // Assert
    expect(res).toEqual({
      _id: insertedId,
      ...new_data
    })
  })


  test('update_one - no record found', async () => {
    // Arrange
    const collection_name = 'test'
    const id = new ObjectId('000000000000000000000000')
    const data = { hello: 'world' }

    // Action
    const res = await Database.update_one(collection_name, id, data)

    // Assert
    expect(res).toEqual(null)
  })

  test('delete_one', async () => {
    // Arrange
    const collection_name = 'test'
    const data = { hello: 'world' }
    const { insertedId } = await Database.insert_one(collection_name, data)

    // Action
    const res = await Database.delete_one(collection_name, insertedId)

    // Assert
    expect(res).toEqual({
      _id: insertedId,
      ...data
    })
  })

  test('delete_one - no record found', async () => {
    // Arrange
    const collection_name = 'test'
    const id = new ObjectId('000000000000000000000000')

    // Action
    const res = await Database.delete_one(collection_name, id)

    // Assert
    expect(res).toEqual(null)
  })
})