// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultUnknownSchemaOptions,
	MergeSchemaOptions,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
	UnknownSchemaOptions,
} from '~'

export interface CustomUnknownSchema<O extends Partial<UnknownSchemaOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownSchema'

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		UnknownSchemaOptions,
		MergeSchemaOptions<DefaultUnknownSchemaOptions, O>
	>

	// readonly [BASE_OPTIONS]: UnknownSchemaOptions
	// readonly [DEFAULT_OPTIONS]: DefaultUnknownSchemaOptions
}
