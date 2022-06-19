import { defaultSchemaOptions, SchemaOptions } from '../../../schema'
import { RegExpEntry } from './RegExpEntry'

export interface StringOptions extends SchemaOptions {
	_out: string
	_in: string
	minLength: number | undefined
	maxLength: number | undefined
	regExps: RegExpEntry[]
}

export const defaultStringOptions = {
	...defaultSchemaOptions,
	_out: 0 as unknown as string,
	_in: 0 as unknown as string,
	minLength: undefined,
	maxLength: undefined,
	regExps: [] as [],
}

export type DefaultStringOptions = typeof defaultStringOptions
