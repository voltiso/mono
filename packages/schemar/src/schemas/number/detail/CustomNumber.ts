// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultNumberOptions,
	DefineSchema,
	MergeSchemaOptions,
	NumberOptions,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
} from '~'

export interface CustomNumber<O extends Partial<NumberOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Number'

	readonly [BASE_OPTIONS]: NumberOptions
	readonly [DEFAULT_OPTIONS]: DefaultNumberOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		NumberOptions,
		MergeSchemaOptions<DefaultNumberOptions, O>
	>

	// readonly [BASE_OPTIONS]: NumberOptions
	// readonly [DEFAULT_OPTIONS]: DefaultNumberOptions

	get isInteger(): this[OPTIONS]['isInteger']
	get getMin(): this[OPTIONS]['min']
	get getMax(): this[OPTIONS]['max']

	//

	get integer(): DefineSchema<this, { isInteger: true }>

	min<MinValue extends number>(
		minValue: MinValue,
	): DefineSchema<this, { min: MinValue }>

	max<MaxValue extends number>(
		maxValue: MaxValue,
	): DefineSchema<this, { max: MaxValue }>

	range<MinValue extends number, MaxValue extends number>(
		minValue: MinValue,
		maxValue: MaxValue,
	): DefineSchema<this, { min: MinValue; max: MaxValue }>
}
