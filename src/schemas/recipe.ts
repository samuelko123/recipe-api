import { JSONSchemaType } from 'ajv'

interface Ingredient {
    name: string,
    qty: number,
    uom: string,
}

export interface Recipe {
    _id?: string,
    name: string,
    ingredients: Array<Ingredient>,
}

export const RecipeSchema: JSONSchemaType<Recipe> = {
    type: 'object',
    required: ['name', 'ingredients'],
    additionalProperties: false,
    properties: {
        _id: {
            type: 'string',
            pattern: '^[a-fA-F0-9]{24}$',
            nullable: true,
        },
        name: {
            type: 'string',
        },
        ingredients: {
            type: 'array',
            items: {
                type: 'object',
                required: ['name', 'qty', 'uom'],
                additionalProperties: false,
                properties: {
                    name: {
                        type: 'string',
                    },
                    qty: {
                        type: 'number',
                    },
                    uom: {
                        type: 'string',
                    },
                },
            },
        },
    }
}