// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultNumberOptions,
	DefineSchema,
	NumberOptions,
	SCHEMA_NAME,
} from '~'

export interface CustomNumber<O extends Partial<NumberOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Number'

	readonly [BASE_OPTIONS]: NumberOptions
	readonly [DEFAULT_OPTIONS]: DefaultNumberOptions

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