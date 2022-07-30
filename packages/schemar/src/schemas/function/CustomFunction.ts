// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultFunctionOptions,
	FunctionOptions,
	MergeSchemaOptions,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
} from '~'

export interface CustomFunction<O extends Partial<FunctionOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Function'

	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		FunctionOptions,
		MergeSchemaOptions<DefaultFunctionOptions, O>
	>

	//

	get getArgumentsSchema(): this[OPTIONS]['arguments']
	get getResultSchema(): this[OPTIONS]['result']
}
