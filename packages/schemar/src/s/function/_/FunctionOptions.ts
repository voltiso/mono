import {
	defaultSchemaOptions,
	IRootSchema,
	SchemaOptions,
} from '../../../schema'
import * as s from '../..'
import { lazyValue } from '@voltiso/ts-util'

export interface FunctionOptions extends SchemaOptions {
	_out: (...args: never) => unknown
	_in: (...args: never) => unknown

	arguments: (s.ITuple | s.IArray) & IRootSchema
	result: IRootSchema
}

export const defaultFunctionOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	arguments: s.array(s.never),
	result: s.unknown,
}))

export type DefaultFunctionOptions = typeof defaultFunctionOptions
