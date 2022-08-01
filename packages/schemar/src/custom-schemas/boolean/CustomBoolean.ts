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
	BooleanOptions,
	CustomSchema,
	DefaultBooleanOptions,
	MergeSchemaOptions,
} from '~'

export interface CustomBoolean<O extends Partial<BooleanOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Boolean'

	readonly [BASE_OPTIONS]: BooleanOptions
	readonly [DEFAULT_OPTIONS]: DefaultBooleanOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		BooleanOptions,
		MergeSchemaOptions<DefaultBooleanOptions, O>
	>

	// readonly [BASE_OPTIONS]: BooleanOptions
	// readonly [DEFAULT_OPTIONS]: DefaultBooleanOptions
}
