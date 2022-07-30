// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultUnknownOptions,
	MergeSchemaOptions,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
	UnknownOptions,
} from '~'

export interface CustomUnknown<O extends Partial<UnknownOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Unknown'

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		UnknownOptions,
		MergeSchemaOptions<DefaultUnknownOptions, O>
	>

	// readonly [BASE_OPTIONS]: UnknownOptions
	// readonly [DEFAULT_OPTIONS]: DefaultUnknownOptions
}
