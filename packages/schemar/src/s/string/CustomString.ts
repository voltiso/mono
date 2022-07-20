// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast1, Merge2Simple } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
} from '../../schema'
import type { IString } from '..'
import type { RegExpEntry } from './_/RegExpEntry.js'
import type { StringOptions } from './_/StringOptions.js'

export interface CustomString<O extends StringOptions>
	extends IString<O>,
		CustomSchema<O> {
	minLength<Min extends number>(minLength: Min): MinLength<this, Min>
	maxLength<Max extends number>(maxLength: Max): MaxLength<this, Max>

	length<ExactLength extends number>(
		exactLength: ExactLength,
	): Length<this, ExactLength>

	length<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max,
	): LengthRange<this, Min, Max>

	regex(regExp: RegExp, expectedDescription?: string): Regex<this>

	get optional(): Optional<this>
	get readonly(): Readonly<this>
	default(defaultValue: this[OPTIONS]['_out']): Default<this>
}

type MinLength<S extends IString, MinLength extends number> = CustomString<
	Merge2Simple<S[OPTIONS], { minLength: MinLength }>
>

type MaxLength<S extends IString, MaxLength extends number> = CustomString<
	Merge2Simple<S[OPTIONS], { maxLength: MaxLength }>
>

type Length<S extends IString, Length extends number> = CustomString<
	Merge2Simple<S[OPTIONS], { minLength: Length; maxLength: Length }>
>

type LengthRange<
	S extends IString,
	MinLength extends number,
	MaxLength extends number,
> = CustomString<
	Merge2Simple<S[OPTIONS], { minLength: MinLength; maxLength: MaxLength }>
>

type Regex<S extends IString> = CustomString<
	Merge2Simple<S[OPTIONS], { regExps: AtLeast1<RegExpEntry> }>
>

type Optional<This extends IString> = CustomString<OptionalOptions<This>>
type Readonly<This extends IString> = CustomString<ReadonlyOptions<This>>
type Default<This extends IString> = CustomString<DefaultOptions<This>>
