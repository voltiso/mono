// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override } from '@voltiso/util'

import type { CustomSchema, CustomSchema$ } from '~'

import type { BigintOptions } from './BigintOptions'

//

export interface CustomBigint<
	O extends Partial<BigintOptions>,
> extends CustomSchema<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Bigint'

	readonly [Voltiso.BASE_OPTIONS]: BigintOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: BigintOptions.Default
}

//

export interface CustomBigint$<
	O extends Partial<BigintOptions>,
> extends CustomSchema$<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Bigint'

	readonly [Voltiso.BASE_OPTIONS]: BigintOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: BigintOptions.Default

	//

	get Final(): CustomBigint<O>

	//

	min<MinValue extends bigint>(
		minValue: MinValue,
	): CustomBigint$<$Override<O, { min: MinValue }>>

	max<MaxValue extends bigint>(
		maxValue: MaxValue,
	): CustomBigint$<$Override<O, { max: MaxValue }>>

	range<MinValue extends bigint, MaxValue extends bigint>(
		minValue: MinValue,
		maxValue: MaxValue,
	): CustomBigint$<$Override<O, { min: MinValue; max: MaxValue }>>
}
