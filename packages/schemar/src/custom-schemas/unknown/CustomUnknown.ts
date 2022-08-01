// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS, PARTIAL_OPTIONS, SCHEMA_NAME } from '_'
import type { Assume } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultUnknownOptions,
	MergeSchemaOptions,
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
