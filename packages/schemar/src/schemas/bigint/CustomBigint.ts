// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	DefaultOptions,
	DefineSchemaOptions,
	OptionalOptions,
	SCHEMA_OPTIONS,
	ReadonlyOptions,
} from '../../Schema/index'
import type { BigintOptions } from './_/BigintOptions.js'
import type { IBigint } from './IBigint.js'

export interface CustomBigint<O extends BigintOptions>
	extends IBigint<O>,
		CustomSchema<O> {
	min<MinValue extends bigint>(minValue: MinValue): Min<this, MinValue>
	max<MaxValue extends bigint>(maxValue: MaxValue): Max<this, MaxValue>
	range<MinValue extends bigint, MaxValue extends bigint>(
		minValue: MinValue,
		maxValue: MaxValue,
	): Range<this, MinValue, MaxValue>

	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type Min<S extends IBigint, MinValue extends bigint> = CustomBigint<
	DefineSchemaOptions<S, { min: MinValue }>
>

type Max<S extends IBigint, MaxValue extends bigint> = CustomBigint<
	DefineSchemaOptions<S, { max: MaxValue }>
>

type Range<
	S extends IBigint,
	MinValue extends bigint,
	MaxValue extends bigint,
> = CustomBigint<DefineSchemaOptions<S, { min: MinValue; max: MaxValue }>>

//

type Optional<This extends IBigint> = CustomBigint<OptionalOptions<This>>
type Readonly<This extends IBigint> = CustomBigint<ReadonlyOptions<This>>
type Default<This extends IBigint> = CustomBigint<DefaultOptions<This>>
