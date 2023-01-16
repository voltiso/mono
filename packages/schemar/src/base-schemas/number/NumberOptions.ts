// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'

export interface NumberOptions extends SchemaOptions {
	// Output: number
	// Input: number

	isInteger: boolean
	min: number | undefined
	max: number | undefined
}

export declare namespace NumberOptions {
	export interface Default extends SchemaOptions.Default {
		Output: number
		Input: number

		isInteger: false
		min: undefined
		max: undefined
	}
}
