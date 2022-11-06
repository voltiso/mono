// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { DefineSchema } from '~'
import type { CustomSchema } from '~/Schema'

import type { BigintOptions, DefaultBigintOptions } from './BigintOptions'

export interface CustomBigint<O extends Partial<BigintOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Bigint'

	readonly [BASE_OPTIONS]: BigintOptions
	readonly [DEFAULT_OPTIONS]: DefaultBigintOptions

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
