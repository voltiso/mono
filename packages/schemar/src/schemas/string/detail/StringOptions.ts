// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'

import {
	type MergeSchemaOptions,
	type SchemaOptions,
	defaultSchemaOptions,
} from '~'

import type { RegExpEntry } from '.'

export interface StringOptions extends SchemaOptions {
	Output: string
	Input: string
	minLength: number | undefined
	maxLength: number | undefined
	regExps: RegExpEntry[]
}

export const defaultStringOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as string,
	Input: 0 as unknown as string,
	minLength: undef,
	maxLength: undef,
	regExps: [] as [],
}

export type DefaultStringOptions = typeof defaultStringOptions

export type DefineStringOptions<O extends Partial<StringOptions>> =
	MergeSchemaOptions<DefaultStringOptions, O>
