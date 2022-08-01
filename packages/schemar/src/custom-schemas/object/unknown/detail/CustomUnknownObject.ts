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
	DefaultUnknownObjectOptions,
	MergeSchemaOptions,
	UnknownObjectOptions,
} from '~'

export interface CustomUnknownObject<O extends Partial<UnknownObjectOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownObject'

	readonly [BASE_OPTIONS]: UnknownObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownObjectOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		UnknownObjectOptions,
		MergeSchemaOptions<DefaultUnknownObjectOptions, O>
	>
}
