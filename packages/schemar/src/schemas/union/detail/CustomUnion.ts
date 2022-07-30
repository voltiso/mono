// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultUnionOptions,
	MergeSchemaOptions,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
	UnionOptions,
} from '~'

export interface CustomUnion<O extends Partial<UnionOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Union'

	readonly [BASE_OPTIONS]: UnionOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnionOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		UnionOptions,
		MergeSchemaOptions<DefaultUnionOptions, O>
	>

	get getSchemas(): this[OPTIONS]['schemas']
}
