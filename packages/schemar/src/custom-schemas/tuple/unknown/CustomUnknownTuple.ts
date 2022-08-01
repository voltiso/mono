// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DEFAULT_OPTIONS, OPTIONS, PARTIAL_OPTIONS, SCHEMA_NAME } from '_'

import type {
	CustomSchema,
	DefaultUnknownTupleOptions,
	DefineSchema,
	UnknownTupleOptions,
} from '~'

export interface CustomUnknownTuple<O extends Partial<UnknownTupleOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownTuple'

	readonly [PARTIAL_OPTIONS]: O
	readonly [DEFAULT_OPTIONS]: DefaultUnknownTupleOptions

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple']
	get getMinLength(): this[OPTIONS]['minLength']
	get getMaxLength(): this[OPTIONS]['maxLength']

	//

	get readonlyTuple(): MakeReadonlyTuple<this>

	//

	minLength<Min extends number>(minLength: Min): MinLength<this, Min>
	maxLength<Max extends number>(maxLength: Max): MaxLength<this, Max>

	lengthRange<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max,
	): LengthRange<this, Min, Max>

	length<ExactLength extends number>(
		exactLength: ExactLength,
	): Length<this, ExactLength>
}

type MakeReadonlyTuple<S> = DefineSchema<S, { isReadonlyTuple: true }>

type MinLength<S, Min extends number> = DefineSchema<S, { minLength: Min }>

type MaxLength<S, Max extends number> = DefineSchema<S, { maxLength: Max }>

type LengthRange<S, Min extends number, Max extends number> = DefineSchema<
	S,
	{ minLength: Min; maxLength: Max }
>

type Length<S, Length extends number> = DefineSchema<
	S,
	{ minLength: Length; maxLength: Length }
>
