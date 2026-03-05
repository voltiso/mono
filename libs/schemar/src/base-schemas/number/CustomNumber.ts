// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type { CustomSchema, CustomSchema$, NumberOptions } from '~'

export interface CustomNumber<O extends Partial<NumberOptions>>
	extends CustomSchema<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Number'

	readonly [Voltiso.BASE_OPTIONS]: NumberOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: NumberOptions.Default

	//

	get isInteger(): this[Voltiso.OPTIONS]['isInteger']
	get getMin(): this[Voltiso.OPTIONS]['min']
	get getMax(): this[Voltiso.OPTIONS]['max']
}

//

export interface CustomNumber$<O extends Partial<NumberOptions>>
	extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Number'

	readonly [Voltiso.BASE_OPTIONS]: NumberOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: NumberOptions.Default

	get isInteger(): this[Voltiso.OPTIONS]['isInteger']
	get getMin(): this[Voltiso.OPTIONS]['min']
	get getMax(): this[Voltiso.OPTIONS]['max']

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
