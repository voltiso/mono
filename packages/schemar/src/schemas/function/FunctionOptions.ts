// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema, SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'
import * as s from '~'

export interface FunctionOptions extends SchemaOptions {
	Output: (...args: any) => unknown
	Input: (...args: any) => unknown

	arguments: ISchema<any[]>
	result: ISchema<unknown>
}

export const defaultFunctionOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as (...args: any) => unknown,
	Input: 0 as unknown as (...args: any) => unknown,

	arguments: s.array(s.any) as unknown as ISchema<any[]>,
	result: s.unknown as unknown as ISchema<unknown>,
}


export type DefaultFunctionOptions = typeof defaultFunctionOptions
