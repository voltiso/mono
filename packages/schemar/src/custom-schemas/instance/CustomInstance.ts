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
	DefaultInstanceOptions,
	InstanceOptions,
	MergeSchemaOptions,
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
