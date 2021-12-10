import { MongoClient, Db, ObjectId } from 'mongodb'

class Database {
    private static _client: MongoClient
    private static _db: Db

    static async connect(uri: string) {
        this._client = await MongoClient.connect(uri)
        this._db = this._client.db()
    }

    static async insert_one(collection_name: string, data: object) {
        return await this._db.collection(collection_name)
            .insertOne(data)
    }

    static async find_one(collection_name: string, id: ObjectId) {
        return await this._db.collection(collection_name)
            .findOne({ _id: id })
    }

    static async update_one(collection_name: string, id: ObjectId, data: object) {
        const doc = await this._db.collection(collection_name)
            .findOneAndUpdate({ _id: id }, { $set: data }, { returnDocument: 'after' })

        return doc.value
    }

    static async delete_one(collection_name: string, id: ObjectId) {
        const doc =  await this._db.collection(collection_name)
            .findOneAndDelete({ _id: id })

        return doc.value
    }
}

export { Database }