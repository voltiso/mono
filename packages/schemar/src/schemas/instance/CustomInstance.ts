// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultInstanceOptions,
	InstanceOptions,
	MergeSchemaOptions,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
} from '~'

export interface CustomInstance<O extends Partial<InstanceOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Instance'

	readonly [BASE_OPTIONS]: InstanceOptions
	readonly [DEFAULT_OPTIONS]: DefaultInstanceOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		InstanceOptions,
		MergeSchemaOptions<DefaultInstanceOptions, O>
	>

	get getConstructor(): this[OPTIONS]['constructor']
}
