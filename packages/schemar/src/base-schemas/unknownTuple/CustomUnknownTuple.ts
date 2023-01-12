// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type {
	$Override_,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
} from '@voltiso/util'

import type { CustomSchema } from '~'

import type { UnknownTupleOptions } from './UnknownTupleOptions'

export interface CustomUnknownTuple<O extends Partial<UnknownTupleOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownTuple'

	readonly [BASE_OPTIONS]: UnknownTupleOptions
	readonly [DEFAULT_OPTIONS]: UnknownTupleOptions.Default

	get isReadonlyTuple(): this[OPTIONS]['isReadonlyTuple']
	get getMinLength(): this[OPTIONS]['minLength']
	get getMaxLength(): this[OPTIONS]['maxLength']

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

export namespace CustomUnknownTuple {
	export type ReadonlyTuple<O> = CustomUnknownTuple<
		$Override_<O, { isReadonlyTuple: true }>
	>
}
