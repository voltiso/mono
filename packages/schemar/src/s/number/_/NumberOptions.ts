import { defaultSchemaOptions, SchemaOptions } from '../../../schema'

export interface NumberOptions extends SchemaOptions {
	_out: number
	_in: number

	integer: boolean
	min: number | undefined
	max: number | undefined
}

export const defaultNumberOptions = {
	...defaultSchemaOptions,
	integer: false as const,
	min: undefined,
	max: undefined,
}

export type DefaultNumberOptions = typeof defaultNumberOptions & NumberOptions
