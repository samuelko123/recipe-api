import { Router, Request, Response, NextFunction } from 'express'
import { RecipeModel } from '../models'
import { RecipeSchema, RecipeDtoSchema } from '../schemas'
import { Validator } from '../services'
import { BaseController } from './base'

class RecipeController extends BaseController {
    private _model: RecipeModel
    private _router: Router

    constructor() {
        super()
        this._model = new RecipeModel()
        this._router = Router()
    }

    init_routes() {
        this._router.post('/recipes', this.insert_one.bind(this))
        this._router.get('/recipes/:id', this.find_one.bind(this))
        this._router.patch('/recipes/:id', this.update_one.bind(this))
        this._router.delete('/recipes/:id', this.delete_one.bind(this))

        return this._router
    }

    async insert_one(req: Request, res: Response, next: NextFunction) {
        try {
            Validator.validate(RecipeSchema, req.body)
            const ack = await this._model.insert_one(req.body)
            const doc = await this._model.find_one(ack.insertedId)
            const doc_dto = this.stringify_object_id(doc)
            Validator.validate(RecipeSchema, doc_dto)
            res.send(doc_dto)
        } catch (err) {
            next(err)
        }
    }

    async find_one(req: Request, res: Response, next: NextFunction) {
        try {
            const id = this.parse_object_id(req.params.id)
            const doc = await this._model.find_one(id)
            const doc_dto = this.stringify_object_id(doc)
            if (Object.keys(doc_dto).length > 0) {
                Validator.validate(RecipeSchema, doc_dto)
            }
            res.send(doc_dto)
        } catch (err) {
            next(err)
        }
    }

    async update_one(req: Request, res: Response, next: NextFunction) {
        try {
            const id = this.parse_object_id(req.params.id)
            Validator.validate(RecipeDtoSchema, req.body)
            const doc = await this._model.update_one(id, req.body)
            const doc_dto = this.stringify_object_id(doc)
            if (Object.keys(doc_dto).length > 0) {
                Validator.validate(RecipeSchema, doc_dto)
            }
            res.send(doc_dto)
        } catch (err) {
            next(err)
        }
    }

    async delete_one(req: Request, res: Response, next: NextFunction) {
        try {
            const id = this.parse_object_id(req.params.id)
            const doc = await this._model.delete_one(id)
            const doc_dto = this.stringify_object_id(doc)
            if (Object.keys(doc_dto).length > 0) {
                Validator.validate(RecipeSchema, doc_dto)
            }
            res.send(doc_dto)
        } catch (err) {
            next(err)
        }
    }
}

export { RecipeController }