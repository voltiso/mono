// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	DefaultFunctionOptions,
	FunctionOptions,
	ISchema,
	SCHEMA_NAME,
} from '~'

type AnyFunction = (...args: any) => unknown

export interface IFunction<T extends AnyFunction = AnyFunction>
	extends ISchema<T> {
	//
	readonly [SCHEMA_NAME]: 'Function'

	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions

	//

	get getArgumentsSchema(): ISchema
	get getResultSchema(): ISchema
}
