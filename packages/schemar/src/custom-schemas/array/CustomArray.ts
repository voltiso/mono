// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
} from '_'
import type { Assume, AtLeast1, If } from '@voltiso/util'

import type {
	ArrayOptions,
	CustomSchema,
	DefaultArrayOptions,
	DefineSchema,
	MergeSchemaOptions,
} from '~'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore error TS2589: Type instantiation is excessively deep and possibly infinite.
export interface CustomArray<O extends Partial<ArrayOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Array'

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		ArrayOptions,
		MergeSchemaOptions<DefaultArrayOptions, O>
	>

	readonly [BASE_OPTIONS]: ArrayOptions
	readonly [DEFAULT_OPTIONS]: DefaultArrayOptions

	//

	get getElementSchema(): this[OPTIONS]['element']
	get isReadonlyArray(): this[OPTIONS]['isReadonlyArray']
	get getMinLength(): this[OPTIONS]['minLength']
	get getMaxLength(): this[OPTIONS]['maxLength']

	//

	get readonlyArray(): MakeReadonlyArray<this>
	get mutableArray(): MakeMutableArray<this>

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
}

//

type MakeReadonlyArray<This> = This extends {
	[OPTIONS]: { Input: readonly unknown[]; Output: readonly unknown[] }
}
	? DefineSchema<
			This,
			{
				readonlyArray: true
				Output: readonly [...This[OPTIONS]['Output']]
				Input: readonly [...This[OPTIONS]['Input']]
			}
	  >
	: never

type MakeMutableArray<This> = This extends {
	[OPTIONS]: { Input: readonly unknown[]; Output: readonly unknown[] }
}
	? DefineSchema<
			This,
			{
				readonlyArray: false
				Output: [...This[OPTIONS]['Output']]
				Input: [...This[OPTIONS]['Input']]
			}
	  >
	: never

//

type MaybeReadonly<T extends readonly unknown[], IsReadonly> = If<
	IsReadonly,
	readonly [...T],
	T
>

type MinLength<This, L extends number> = This extends {
	[OPTIONS]: {
		Output: readonly unknown[]
		Input: readonly unknown[]
		isReadonlyArray: boolean
	}
}
	? DefineSchema<
			This,
			{
				minLength: L
				Output: MaybeReadonly<
					L extends 1
						? AtLeast1<This[OPTIONS]['Output'][number]>
						: This[OPTIONS]['Output'],
					This[OPTIONS]['isReadonlyArray']
				>
				Input: MaybeReadonly<
					L extends 1
						? AtLeast1<This[OPTIONS]['Input'][number]>
						: This[OPTIONS]['Input'],
					This[OPTIONS]['isReadonlyArray']
				>
			}
	  >
	: never

//

type MaxLength<This, L extends number> = DefineSchema<This, { maxLength: L }>

type Length<This, L extends number> = DefineSchema<
	This,
	{ minLength: L; maxLength: L }
>

type LengthRange<
	This,
	MinLength extends number,
	MaxLength extends number,
> = DefineSchema<This, { minLength: MinLength; maxLength: MaxLength }>
