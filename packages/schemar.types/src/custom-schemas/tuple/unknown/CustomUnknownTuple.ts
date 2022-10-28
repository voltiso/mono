// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DEFAULT_OPTIONS, OPTIONS, PARTIAL_OPTIONS, SCHEMA_NAME } from '_'

import type { DefineSchema } from '~'
import type { $$Schema, CustomSchema } from '~/Schema'

import type {
	DefaultUnknownTupleOptions,
	UnknownTupleOptions,
} from './UnknownTupleOptions'

export interface CustomUnknownTuple<O extends Partial<UnknownTupleOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownTuple'

	readonly [PARTIAL_OPTIONS]: O
	readonly [DEFAULT_OPTIONS]: DefaultUnknownTupleOptions

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple']
	get getMinLength(): this[OPTIONS]['minLength']
	get getMaxLength(): this[OPTIONS]['maxLength']

	//

	get readonlyTuple(): CustomUnknownTuple.ReadonlyTuple<this>

	//

	minLength<Min extends number>(
		minLength: Min,
	): CustomUnknownTuple.MinLength<this, Min>

	maxLength<Max extends number>(
		maxLength: Max,
	): CustomUnknownTuple.MaxLength<this, Max>

	lengthRange<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max,
	): CustomUnknownTuple.LengthRange<this, Min, Max>

	length<ExactLength extends number>(
		exactLength: ExactLength,
	): CustomUnknownTuple.Length<this, ExactLength>
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CustomUnknownTuple {
	export type ReadonlyTuple<S extends $$Schema> = DefineSchema<
		S,
		{ isReadonlyTuple: true }
	>

	export type MinLength<S extends $$Schema, Min extends number> = DefineSchema<
		S,
		{ minLength: Min }
	>

	export type MaxLength<S extends $$Schema, Max extends number> = DefineSchema<
		S,
		{ maxLength: Max }
	>

	export type LengthRange<
		S extends $$Schema,
		Min extends number,
		Max extends number,
	> = DefineSchema<S, { minLength: Min; maxLength: Max }>

	export type Length<S extends $$Schema, Length extends number> = DefineSchema<
		S,
		{ minLength: Length; maxLength: Length }
	>
}
