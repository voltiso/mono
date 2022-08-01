// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type { DefaultFunctionOptions, FunctionOptions, ISchema } from '~'

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
