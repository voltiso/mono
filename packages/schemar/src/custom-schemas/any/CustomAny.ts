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
	AnyOptions,
	CustomSchema,
	DefaultAnyOptions,
	MergeSchemaOptions,
} from '~'

export interface CustomAny<O extends Partial<AnyOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Any'

	readonly [BASE_OPTIONS]: AnyOptions
	readonly [DEFAULT_OPTIONS]: DefaultAnyOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		AnyOptions,
		MergeSchemaOptions<DefaultAnyOptions, O>
	>
}
