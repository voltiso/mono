// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BivariantUnknownFunction,
	DefaultSchemaOptions,
	SchemaLike,
	SchemaOptions,
} from '~'

export interface FunctionOptions extends SchemaOptions {
	Output: (...args: any) => any
	Input: (...args: any) => any

	arguments: SchemaLike<any[]>
	result: SchemaLike<unknown>
}

export interface DefaultFunctionOptions extends DefaultSchemaOptions {
	Output: BivariantUnknownFunction
	Input: BivariantUnknownFunction
}
