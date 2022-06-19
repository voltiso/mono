import {
	defaultSchemaOptions,
	InferableObject,
	SchemaOptions,
} from '../../../schema'

export interface ObjectOptions extends SchemaOptions {
	_out: object
	_in: object
	shape: InferableObject
}

export const defaultObjectOptions = {
	...defaultSchemaOptions,
}

export type DefaultObjectOptions = typeof defaultObjectOptions
