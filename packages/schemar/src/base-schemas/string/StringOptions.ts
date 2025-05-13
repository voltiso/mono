// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'

import type { RegExpEntry } from './RegExpEntry'

export interface StringOptions extends SchemaOptions {
	// Output: string
	// Input: string
	minLength: number | undefined
	maxLength: number | undefined
	regExps: RegExpEntry[]
}

export declare namespace StringOptions {
	export interface Default extends SchemaOptions.Default {
		Output: string
		Input: string
		minLength: undefined
		maxLength: undefined
		regExps: []
	}
}
