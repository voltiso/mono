// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
} from '_'
import type { Assume } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultUnknownFunctionOptions,
	MergeSchemaOptions,
	UnknownFunctionOptions,
} from '~'

export interface CustomUnknownFunction<
	O extends Partial<UnknownFunctionOptions>,
> extends CustomSchema<O> {
	[SCHEMA_NAME]: 'UnknownFunction'

	readonly [BASE_OPTIONS]: UnknownFunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownFunctionOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		UnknownFunctionOptions,
		MergeSchemaOptions<DefaultUnknownFunctionOptions, O>
	>

	// [BASE_OPTIONS]: UnknownFunctionOptions
	// [DEFAULT_OPTIONS]: DefaultUnknownFunctionOptions
}
