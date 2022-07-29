// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast1, If } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultOptions,
	DefineSchemaOptions,
	OptionalOptions,
	SCHEMA_OPTIONS,
	ReadonlyOptions,
} from '../../Schema/index'
import type { ArrayOptions } from './_/ArrayOptions.js'
import type { IArray } from './IArray.js'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore error TS2589: Type instantiation is excessively deep and possibly infinite.
export interface CustomArray<O extends ArrayOptions>
	extends IArray<O>,
		CustomSchema<O> {
	get readonlyArray(): MakeReadonlyArray<this>

	minLength<Min extends number>(minLength: Min): MinLength<this, Min>
	maxLength<Max extends number>(maxLength: Max): MaxLength<this, Max>

	length<ExactLength extends number>(
		exactLength: ExactLength,
	): Length<this, ExactLength>

	lengthRange<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max,
	): LengthRange<this, Min, Max>

	//

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['Output']): Default<this>
}

//

type MakeReadonlyArray<This extends IArray> = CustomArray<
	DefineSchemaOptions<
		This,
		{
			readonlyArray: true
			_out: readonly [...This['OutputType']]
			_in: readonly [...This['InputType']]
		}
	>
>

//

type MaybeReadonly<T extends readonly unknown[], IsReadonly> = If<
	IsReadonly,
	readonly [...T],
	T
>

type MinLength<This extends IArray, L extends number> = CustomArray<
	DefineSchemaOptions<
		This,
		{
			minLength: L
			_out: MaybeReadonly<
				L extends 1 ? AtLeast1<This['OutputType'][number]> : This['OutputType'],
				This['isReadonlyArray']
			>
			_in: MaybeReadonly<
				L extends 1 ? AtLeast1<This['InputType'][number]> : This['InputType'],
				This['isReadonlyArray']
			>
		}
	>
>

//

type MaxLength<This extends IArray, L extends number> = CustomArray<
	DefineSchemaOptions<This, { maxLength: L }>
>

type Length<This extends IArray, L extends number> = CustomArray<
	DefineSchemaOptions<This, { minLength: L; maxLength: L }>
>

type LengthRange<
	This extends IArray,
	MinLength extends number,
	MaxLength extends number,
> = CustomArray<
	DefineSchemaOptions<This, { minLength: MinLength; maxLength: MaxLength }>
>

//

type Optional<This extends IArray> = CustomArray<OptionalOptions<This>>
type Readonly<This extends IArray> = CustomArray<ReadonlyOptions<This>>
type Default<This extends IArray> = CustomArray<DefaultOptions<This>>
