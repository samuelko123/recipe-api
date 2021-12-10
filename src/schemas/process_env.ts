import { JSONSchemaType } from 'ajv'

interface ProcessEnv {
    NODE_ENV: string,
    PORT: number,
    MONGO_URI_DEV: string,
    MONGO_URI_PROD: string,
}

export const ProcessEnvSchema: JSONSchemaType<ProcessEnv> = {
    type: 'object',
    required: ['PORT', 'MONGO_URI_DEV', 'MONGO_URI_PROD'],
    additionalProperties: true,
    properties: {
        NODE_ENV: {
            type: 'string',
            enum: ['production', 'development', 'test'],
        },
        PORT: {
            type: 'integer',
            minimum: 1025,
            maximum: 65535,
        },
        MONGO_URI_DEV: {
            type: 'string',
        },
        MONGO_URI_PROD: {
            type: 'string',
        },
    }
}