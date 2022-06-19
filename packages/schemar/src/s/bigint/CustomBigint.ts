import {
	CustomSchema,
	DefaultOptions,
	MergeOptions,
	OptionalOptions,
	ReadonlyOptions,
} from '../../schema'
import { IBigint } from './IBigint'
import { BigintOptions } from './_/BigintOptions'

export interface CustomBigint<O extends BigintOptions>
	extends IBigint<O>,
		CustomSchema<O> {
	min<MinValue extends bigint>(minValue: MinValue): Min<this, MinValue>
	max<MaxValue extends bigint>(maxValue: MaxValue): Max<this, MaxValue>
	range<MinValue extends bigint, MaxValue extends bigint>(
		minValue: MinValue,
		maxValue: MaxValue
	): Range<this, MinValue, MaxValue>

	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default<D>(defaultValue: D): Default<this, D>
}

type Min<S extends IBigint, MinValue extends bigint> = CustomBigint<
	MergeOptions<S, { min: MinValue }>
>

type Max<S extends IBigint, MaxValue extends bigint> = CustomBigint<
	MergeOptions<S, { max: MaxValue }>
>

type Range<
	S extends IBigint,
	MinValue extends bigint,
	MaxValue extends bigint
> = CustomBigint<MergeOptions<S, { min: MinValue; max: MaxValue }>>

//

type Optional<This extends IBigint> = CustomBigint<OptionalOptions<This>>
type Readonly<This extends IBigint> = CustomBigint<ReadonlyOptions<This>>
type Default<This extends IBigint, D> = CustomBigint<DefaultOptions<This, D>>
