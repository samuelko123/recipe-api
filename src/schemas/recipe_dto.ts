import { JSONSchemaType } from 'ajv'

interface Ingredient {
    name?: string,
    qty?: number,
    uom?: string,
}

export interface RecipeDto {
    _id?: string,
    name?: string,
    ingredients?: Array<Ingredient>,
}

export const RecipeDtoSchema: JSONSchemaType<RecipeDto> = {
    type: 'object',
    additionalProperties: false,
    properties: {
        _id: {
            type: 'string',
            pattern: '^[a-fA-F0-9]{24}$',
            nullable: true,
        },
        name: {
            type: 'string',
            nullable: true,
        },
        ingredients: {
            type: 'array',
            nullable: true,
            items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    name: {
                        type: 'string',
                        nullable: true,
                    },
                    qty: {
                        type: 'number',
                        nullable: true,
                    },
                    uom: {
                        type: 'string',
                        nullable: true,
                    },
                },
            },
        },
    }
}