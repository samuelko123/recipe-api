import { Database } from '../services'
import { Recipe } from '../schemas'
import { BaseModel } from './base'
import { ObjectId } from 'mongodb'

class RecipeModel extends BaseModel {
   private _name = 'recipes'

   get name() {
      return this._name
   }

   async insert_one(data: Recipe) {
      return await Database.insert_one(this._name, data)
   }

   async find_one(id: ObjectId) {
      return await Database.find_one(this._name, id)
   }

   async update_one(id: ObjectId, data: Recipe) {
      return await Database.update_one(this._name, id, data)
   }

   async delete_one(id: ObjectId) {
      return await Database.delete_one(this._name, id)
   }
}

export { RecipeModel }