// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$Override_,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
} from '@voltiso/util'

import type { CustomSchema, CustomSchema$, SCHEMA_NAME } from '~'

import type { StringOptions } from './StringOptions'

//

export interface CustomString<O extends Partial<StringOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'String'

	readonly [BASE_OPTIONS]: StringOptions
	readonly [DEFAULT_OPTIONS]: StringOptions.Default

	//

	get getMinLength(): this[OPTIONS]['minLength']
	get getMaxLength(): this[OPTIONS]['maxLength']
}

//

export interface CustomString$<O extends Partial<StringOptions>>
	extends CustomSchema$<O> {
	//
	readonly [SCHEMA_NAME]: 'String'

	readonly [BASE_OPTIONS]: StringOptions
	readonly [DEFAULT_OPTIONS]: StringOptions.Default

	//

	get getMinLength(): this[OPTIONS]['minLength']
	get getMaxLength(): this[OPTIONS]['maxLength']

	//

	get Final(): CustomString<O>

	//

	minLength<Min extends number>(
		minLength: Min,
	): CustomString$<$Override_<O, { minLength: Min }>>

	maxLength<Max extends number>(
		maxLength: Max,
	): CustomString$<$Override_<O, { maxLength: Max }>>

	length<ExactLength extends number>(
		exactLength: ExactLength,
	): CustomString$<
		$Override_<O, { minLength: ExactLength; maxLength: ExactLength }>
	>

	lengthRange<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max,
	): CustomString$<$Override_<O, { minLength: Min; maxLength: Max }>>

	//

	regex(regExp: RegExp, expectedDescription?: string): this // CustomString$<$Override_<O, { regExps: AtLeast1<RegExpEntry> }>>
}
