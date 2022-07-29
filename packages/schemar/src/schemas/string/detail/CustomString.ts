// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast1 } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefineSchema,
	OPTIONS,
	SCHEMA_NAME,
} from '~'

import type { DefaultStringOptions, RegExpEntry, StringOptions } from '.'

export interface CustomString<O extends Partial<StringOptions>>
	extends CustomSchema<O> {
	//
	readonly [SCHEMA_NAME]: 'String'

	readonly [BASE_OPTIONS]: StringOptions
	readonly [DEFAULT_OPTIONS]: DefaultStringOptions

	//

	get getMinLength(): this[OPTIONS]['minLength']
	get getMaxLength(): this[OPTIONS]['maxLength']

	//

	minLength<Min extends number>(
		minLength: Min,
	): DefineSchema<this, { minLength: Min }>

	maxLength<Max extends number>(
		maxLength: Max,
	): DefineSchema<this, { maxLength: Max }>

	length<ExactLength extends number>(
		exactLength: ExactLength,
	): DefineSchema<this, { minLength: ExactLength; maxLength: ExactLength }>

	lengthRange<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max,
	): DefineSchema<this, { minLength: Min; maxLength: Max }>

	regex(
		regExp: RegExp,
		expectedDescription?: string,
	): DefineSchema<this, { regExps: AtLeast1<RegExpEntry> }>
}
