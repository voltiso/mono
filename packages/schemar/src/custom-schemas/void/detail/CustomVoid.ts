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
	DefaultVoidOptions,
	MergeSchemaOptions,
	VoidOptions,
} from '~'

export interface CustomVoid<O extends Partial<VoidOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Void'

	readonly [BASE_OPTIONS]: VoidOptions
	readonly [DEFAULT_OPTIONS]: DefaultVoidOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		VoidOptions,
		MergeSchemaOptions<DefaultVoidOptions, O>
	>
}