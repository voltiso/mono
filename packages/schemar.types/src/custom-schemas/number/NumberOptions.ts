// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~'

export interface NumberOptions extends SchemaOptions {
	Output: number
	Input: number

	isInteger: boolean
	min: number | undefined
	max: number | undefined
}

export interface DefaultNumberOptions extends DefaultSchemaOptions {
	Output: number
	Input: number

	isInteger: false
	min: undefined
	max: undefined
}
