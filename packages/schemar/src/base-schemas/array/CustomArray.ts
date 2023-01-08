// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	AtLeast1,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	If,
	OPTIONS,
} from '@voltiso/util'

import type { CustomSchema, DefineSchema, SCHEMA_NAME } from '~'

import type { $$Array } from '.'
import type { ArrayOptions, DefaultArrayOptions } from './ArrayOptions'

export interface $$CustomArray {
	readonly [SCHEMA_NAME]: 'Array'
}

export interface CustomArray<O extends Partial<ArrayOptions>>
	extends $$CustomArray,
		CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Array'

	readonly [BASE_OPTIONS]: ArrayOptions
	readonly [DEFAULT_OPTIONS]: DefaultArrayOptions

	//

	get getElementSchema(): this[OPTIONS]['element']
	get isReadonlyArray(): this[OPTIONS]['isReadonlyArray']
	get getMinLength(): this[OPTIONS]['minLength']
	get getMaxLength(): this[OPTIONS]['maxLength']

	//

	get readonlyArray(): CustomArray.MakeReadonly<this>
	get mutableArray(): CustomArray.MakeMutable<this>

	minLength<Min extends number>(
		minLength: Min,
	): CustomArray.MinLength<this, Min>

	maxLength<Max extends number>(
		maxLength: Max,
	): CustomArray.MaxLength<this, Max>

	length<ExactLength extends number>(
		exactLength: ExactLength,
	): CustomArray.Length<this, ExactLength>

	lengthRange<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max,
	): CustomArray.LengthRange<this, Min, Max>
}

//

export namespace CustomArray {
	export type MakeReadonly<This extends $$CustomArray> = This extends {
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

	export type MakeMutable<This extends $$CustomArray> = This extends {
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

	export type MaybeReadonly<T extends readonly unknown[], IsReadonly> = If<
		IsReadonly,
		readonly [...T],
		T
	>

	export type MinLength<This extends $$Array, L extends number> = This extends {
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

	export type MaxLength<This extends $$Array, L extends number> = DefineSchema<
		This,
		{ maxLength: L }
	>

	export type Length<This extends $$Array, L extends number> = DefineSchema<
		This,
		{ minLength: L; maxLength: L }
	>

	export type LengthRange<
		This extends $$Array,
		MinLength extends number,
		MaxLength extends number,
	> = DefineSchema<This, { minLength: MinLength; maxLength: MaxLength }>
}
