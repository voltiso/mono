// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS, SCHEMA_NAME } from '_'

import type { ISchema } from '~'

import type { ArrayOptions } from '.'

export interface IArray extends ISchema {
	readonly [SCHEMA_NAME]: 'Array'

	[OPTIONS]: ArrayOptions

	// readonly [BASE_OPTIONS]: ArrayOptions
	// readonly [DEFAULT_OPTIONS]: DefaultMutableArrayOptions

	get Type(): readonly unknown[]
	get OutputType(): readonly unknown[]
	get InputType(): readonly unknown[]

	readonly getElementSchema: ISchema
	readonly isReadonlyArray: boolean
	readonly getMinLength: number | undefined
	readonly getMaxLength: number | undefined

	readonly readonlyArray: IArray
	readonly mutableArray: IArray
}

export interface IReadonlyArray extends IArray {}
export interface IMutableArray extends IArray {
	get Type(): unknown[]
	get OutputType(): unknown[]
	get InputType(): unknown[]
}
