// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { Schema, SchemaLike, SchemaOptions } from '~'
import { any, array, defaultSchemaOptions, unknown } from '~'

export interface FunctionOptions extends SchemaOptions {
	Output: (...args: any) => any
	Input: (...args: any) => any

	arguments: SchemaLike<any[]>
	result: SchemaLike<unknown>
}

export const defaultFunctionOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	Output: 0 as unknown as (...args: any) => unknown,
	Input: 0 as unknown as (...args: any) => unknown,

	arguments: array(any) as unknown as Schema<any[]>,
	result: unknown as unknown as Schema<unknown>,
}))

export type DefaultFunctionOptions = typeof defaultFunctionOptions
