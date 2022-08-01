// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { ISchema, SchemaOptions } from '~'
import { any, array, defaultSchemaOptions, unknown } from '~'

export interface FunctionOptions extends SchemaOptions {
	Output: (...args: any) => unknown
	Input: (...args: any) => unknown

	arguments: ISchema<any[]>
	result: ISchema<unknown>
}

export const defaultFunctionOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	Output: 0 as unknown as (...args: any) => unknown,
	Input: 0 as unknown as (...args: any) => unknown,

	arguments: array(any) as unknown as ISchema<any[]>,
	result: unknown as unknown as ISchema<unknown>,
}))

export type DefaultFunctionOptions = typeof defaultFunctionOptions
