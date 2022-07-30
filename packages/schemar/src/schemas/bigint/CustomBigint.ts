// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	BigintOptions,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultBigintOptions,
	DefineSchema,
	MergeSchemaOptions,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
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
