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
	BigintOptions,
	CustomSchema,
	DefaultBigintOptions,
	DefineSchema,
	MergeSchemaOptions,
} from '~'

export interface CustomBigint<O extends Partial<BigintOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Bigint'

	readonly [BASE_OPTIONS]: BigintOptions
	readonly [DEFAULT_OPTIONS]: DefaultBigintOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		BigintOptions,
		MergeSchemaOptions<DefaultBigintOptions, O>
	>

	min<MinValue extends bigint>(
		minValue: MinValue,
	): DefineSchema<this, { min: MinValue }>

	max<MaxValue extends bigint>(
		maxValue: MaxValue,
	): DefineSchema<this, { max: MaxValue }>

	range<MinValue extends bigint, MaxValue extends bigint>(
		minValue: MinValue,
		maxValue: MaxValue,
	): DefineSchema<this, { min: MinValue; max: MaxValue }>
}
