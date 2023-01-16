// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$Override_,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
} from '@voltiso/util'

import type { CustomSchema, CustomSchema$, NumberOptions, SCHEMA_NAME } from '~'

export interface CustomNumber<O extends Partial<NumberOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Number'

	readonly [BASE_OPTIONS]: NumberOptions
	readonly [DEFAULT_OPTIONS]: NumberOptions.Default

	//

	get isInteger(): this[OPTIONS]['isInteger']
	get getMin(): this[OPTIONS]['min']
	get getMax(): this[OPTIONS]['max']
}

//

export interface CustomNumber$<O extends Partial<NumberOptions>>
	extends CustomSchema$<O> {
	//
	readonly [SCHEMA_NAME]: 'Number'

	readonly [BASE_OPTIONS]: NumberOptions
	readonly [DEFAULT_OPTIONS]: NumberOptions.Default

	get isInteger(): this[OPTIONS]['isInteger']
	get getMin(): this[OPTIONS]['min']
	get getMax(): this[OPTIONS]['max']

	//

	get Final(): CustomNumber<O>

	get integer(): CustomNumber$<$Override_<O, { isInteger: true }>>

	min<MinValue extends number>(
		minValue: MinValue,
	): CustomNumber$<$Override_<O, { min: MinValue }>>

	max<MaxValue extends number>(
		maxValue: MaxValue,
	): CustomNumber$<$Override_<O, { max: MaxValue }>>

	range<MinValue extends number, MaxValue extends number>(
		minValue: MinValue,
		maxValue: MaxValue,
	): CustomNumber$<$Override_<O, { min: MinValue; max: MaxValue }>>
}
