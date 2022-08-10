// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS, SCHEMA_NAME } from '_'

import type { CustomSchema, DefaultFunctionOptions, FunctionOptions } from '~'

export interface CustomFunction<O extends Partial<FunctionOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Function'

	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions

	// readonly [PARTIAL_OPTIONS]: O

	// readonly [OPTIONS]: Assume<
	// 	FunctionOptions,
	// 	MergeSchemaOptions<DefaultFunctionOptions, O>
	// >

	//

	get getArgumentsSchema(): this[OPTIONS]['arguments']
	get getResultSchema(): this[OPTIONS]['result']
}
