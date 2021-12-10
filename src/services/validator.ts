import Ajv, { JSONSchemaType } from 'ajv'
import { ValidationError } from '../errors'
import * as schemas from '../schemas'

class Validator {
    private static _ajv = new Ajv({
        removeAdditional: false,
        useDefaults: true,
        coerceTypes: true,
        allErrors: true,
        logger: false,
    })

    static init() {
        // cache compiled schemas
        for (const schema of Object.values(schemas)) {
            this._ajv.compile(schema)
        }
    }

    static validate<T>(schema: JSONSchemaType<T>, obj: unknown): T {
        // cached schema to validate
        const is_valid = this._ajv.validate(schema, obj)
        if (!is_valid) {
            throw new ValidationError(this._ajv.errors)
        }

        // return type-guarded object
        return obj
    }
}

export { Validator }