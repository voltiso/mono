// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type { CustomSchema, CustomSchema$ } from '~'

import type { UnknownTupleOptions } from './UnknownTupleOptions'

export interface CustomUnknownTuple<O extends Partial<UnknownTupleOptions>>
	extends CustomSchema<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownTuple'

	readonly [Voltiso.BASE_OPTIONS]: UnknownTupleOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownTupleOptions.Default

	get isReadonlyTuple(): this[Voltiso.OPTIONS]['isReadonlyTuple']
	get getMinLength(): this[Voltiso.OPTIONS]['minLength']
	get getMaxLength(): this[Voltiso.OPTIONS]['maxLength']
}

export interface CustomUnknownTuple$<O extends Partial<UnknownTupleOptions>>
	extends CustomSchema$<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'UnknownTuple'

	readonly [Voltiso.BASE_OPTIONS]: UnknownTupleOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownTupleOptions.Default

	get isReadonlyTuple(): this[Voltiso.OPTIONS]['isReadonlyTuple']
	get getMinLength(): number // this[Voltiso.OPTIONS]['minLength']
	get getMaxLength(): number // this[Voltiso.OPTIONS]['maxLength']

	//

	get Final(): CustomUnknownTuple<O>

	//

	get readonlyTuple(): CustomUnknownTuple.ReadonlyTuple<O>

	//

	minLength<Min extends number>(
		minLength: Min,
	): CustomUnknownTuple<$Override_<O, { minLength: Min }>>

	maxLength<Max extends number>(
		maxLength: Max,
	): CustomUnknownTuple<$Override_<O, { maxLength: Max }>>

	lengthRange<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max,
	): CustomUnknownTuple<$Override_<O, { minLength: Min; maxLength: Max }>>

	length<ExactLength extends number>(
		exactLength: ExactLength,
	): CustomUnknownTuple<
		$Override_<O, { minLength: ExactLength; maxLength: ExactLength }>
	>
}

//

export declare namespace CustomUnknownTuple {
	export type ReadonlyTuple<O> = CustomUnknownTuple$<
		$Override_<O, { isReadonlyTuple: true }>
	>
}
