// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$Override_,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	IsCompatible,
	OPTIONS,
} from '@voltiso/util'

import type {
	$$Array,
	CustomSchema,
	CustomSchema$,
	Schema,
	SCHEMA_NAME,
} from '~'

import type { ArrayOptions } from './ArrayOptions'

//

export interface CustomArray<O extends Partial<ArrayOptions>>
	extends $$Array,
		CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'Array'

	readonly [BASE_OPTIONS]: ArrayOptions
	readonly [DEFAULT_OPTIONS]: ArrayOptions.Default

	//

	get getElementSchema(): CustomArray.GetElementSchema<this>

	get isReadonlyArray(): this[OPTIONS]['isReadonlyArray']
	get getMinLength(): this[OPTIONS]['minLength']
	get getMaxLength(): this[OPTIONS]['maxLength']
}

//

export interface CustomArray$<O extends Partial<ArrayOptions>>
	extends $$Array,
		CustomSchema$<O> {
	//
	readonly [SCHEMA_NAME]: 'Array'

	readonly [BASE_OPTIONS]: ArrayOptions
	readonly [DEFAULT_OPTIONS]: ArrayOptions.Default

	//

	get getElementSchema(): CustomArray.GetElementSchema<this>

	get isReadonlyArray(): this[OPTIONS]['isReadonlyArray']
	get getMinLength(): this[OPTIONS]['minLength']
	get getMaxLength(): this[OPTIONS]['maxLength']

	//

	get readonlyArray(): CustomArray.MakeReadonly<this, O>
	get mutableArray(): CustomArray.MakeMutable<this, O>

	//

	get Final(): CustomArray<O>

	//

	minLength<Min extends number>(
		minLength: Min,
	): CustomArray.With<O, { minLength: Min }>

	maxLength<Max extends number>(
		maxLength: Max,
	): CustomArray.With<O, { maxLength: Max }>

	length<ExactLength extends number>(
		exactLength: ExactLength,
	): CustomArray.With<O, { minLength: ExactLength; maxLength: ExactLength }>

	lengthRange<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max,
	): CustomArray.With<O, { minLength: Min; maxLength: Max }>
}

//

export declare namespace CustomArray {
	export type With<O, OO> = CustomArray<$Override_<O, OO>>

	export type GetElementSchema<This> = This extends {
		Output: readonly unknown[]
		Input: unknown
	}
		? IsCompatible<
				This['Output'][number],
				Extract<This['Input'], readonly unknown[]>[number]
		  > extends true
			? Schema<This['Output'][number]>
			: CustomSchema<{
					Output: This['Output'][number]
					Input: Extract<This['Input'], readonly unknown[]>[number]
			  }>
		: never

	export type MakeReadonly<This, O> = This extends {
		Output: readonly unknown[]
		Input: unknown
	}
		? With<
				O,
				{
					readonlyArray: true
					Output: readonly [...This['Output']]
					Input: readonly [...Extract<This['Input'], readonly unknown[]>]
				}
		  >
		: never

	export type MakeMutable<
		This extends $$Array & {
			[OPTIONS]: { Input: readonly unknown[]; Output: readonly unknown[] }
		},
		O,
	> = With<
		O,
		{
			readonlyArray: false
			Output: [...This[OPTIONS]['Output']]
			Input: [...This[OPTIONS]['Input']]
		}
	>

	//

	// export type MaybeReadonly<T extends readonly unknown[], IsReadonly> = If<
	// 	IsReadonly,
	// 	readonly [...T],
	// 	T
	// >

	// export type MinLength<
	// 	This extends $$Array & {
	// 		[OPTIONS]: {
	// 			Output: readonly unknown[]
	// 			Input: readonly unknown[]
	// 			isReadonlyArray: boolean
	// 		}
	// 	},
	// 	O,
	// 	L extends number,
	// > = With<
	// 	O,
	// 	{
	// 		minLength: L
	// 		Output: MaybeReadonly<
	// 			L extends 1
	// 				? AtLeast1<This[OPTIONS]['Output'][number]>
	// 				: This[OPTIONS]['Output'],
	// 			This[OPTIONS]['isReadonlyArray']
	// 		>
	// 		Input: MaybeReadonly<
	// 			L extends 1
	// 				? AtLeast1<This[OPTIONS]['Input'][number]>
	// 				: This[OPTIONS]['Input'],
	// 			This[OPTIONS]['isReadonlyArray']
	// 		>
	// 	}
	// >
}
