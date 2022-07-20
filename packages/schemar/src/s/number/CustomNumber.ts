// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	MergeOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type * as s from '..'
import type { NumberOptions } from './_/NumberOptions.js'
import type { INumber } from './INumber.js'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore error TS2589: Type instantiation is excessively deep and possibly infinite.
export interface CustomNumber<O extends NumberOptions>
	extends INumber<O>,
		CustomSchema<O> {
	<L extends number>(...literals: L[]): s.Literal<L>
	<L extends number>(literals: Set<L>): s.Literal<L>
	<L extends number>(...args: L[] | [Set<L>]): s.Literal<L>

	get integer(): this // Integer<this>

	min<MinValue extends number>(minValue: MinValue): Min<this, MinValue>
	max<MaxValue extends number>(maxValue: MaxValue): Max<this, MaxValue>

	range<MinValue extends number, MaxValue extends number>(
		minValue: MinValue,
		maxValue: MaxValue,
	): Range<this, MinValue, MaxValue>

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

//

// type Integer<This extends INumber> = CustomNumber<
// 	MergeOptions<This, { isInteger: true }>
// >

type Min<This extends INumber, MinValue extends number> = CustomNumber<
	MergeOptions<This, { min: MinValue }>
>

type Max<This extends INumber, MaxValue extends number> = CustomNumber<
	MergeOptions<This, { max: MaxValue }>
>

type Range<
	This extends INumber,
	MinValue extends number,
	MaxValue extends number,
> = CustomNumber<MergeOptions<This, { min: MinValue; max: MaxValue }>>

//

type Optional<This extends INumber> = CustomNumber<OptionalOptions<This>>
type Readonly<This extends INumber> = CustomNumber<ReadonlyOptions<This>>
type Default<This extends INumber> = CustomNumber<DefaultOptions<This>>
