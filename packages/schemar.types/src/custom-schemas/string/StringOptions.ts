// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~/SchemaOptions'

import type { RegExpEntry } from './RegExpEntry'

export interface StringOptions extends SchemaOptions {
	Output: string
	Input: string
	minLength: number | undefined
	maxLength: number | undefined
	regExps: RegExpEntry[]
}

export interface DefaultStringOptions extends DefaultSchemaOptions {
	Output: string
	Input: string
	minLength: undefined
	maxLength: undefined
	regExps: []
}
