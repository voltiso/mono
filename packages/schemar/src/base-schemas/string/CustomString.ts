// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type { CustomSchema, CustomSchema$ } from '~'

import type { StringOptions } from './StringOptions'

//

export interface CustomString<
	O extends Partial<StringOptions>,
> extends CustomSchema<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'String'

	readonly [Voltiso.BASE_OPTIONS]: StringOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: StringOptions.Default

	//

	get getMinLength(): this[Voltiso.OPTIONS]['minLength']
	get getMaxLength(): this[Voltiso.OPTIONS]['maxLength']
}

//

export interface CustomString$<
	O extends Partial<StringOptions>,
> extends CustomSchema$<O> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'String'

	readonly [Voltiso.BASE_OPTIONS]: StringOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: StringOptions.Default

	//

	get getMinLength(): this[Voltiso.OPTIONS]['minLength']
	get getMaxLength(): this[Voltiso.OPTIONS]['maxLength']

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
