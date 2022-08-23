// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS, SCHEMA_NAME } from '_'

import type { ISchema, SchemaLike } from '~'

import type { ArrayOptions } from '.'

export interface ArrayLike<T extends readonly unknown[] = readonly unknown[]>
	extends SchemaLike<T> {
	readonly [SCHEMA_NAME]: 'Array'
}

export interface IArray extends ISchema<readonly unknown[]> {
	readonly [SCHEMA_NAME]: 'Array'

	[OPTIONS]: ArrayOptions

	readonly getElementSchema: SchemaLike
	readonly isReadonlyArray: boolean
	readonly getMinLength: number | undefined
	readonly getMaxLength: number | undefined

	readonly readonlyArray: any
	readonly mutableArray: any
}

export interface IReadonlyArray extends IArray {}

export interface IMutableArray extends IArray {
	get Type(): unknown[]
	get OutputType(): unknown[]
	get InputType(): unknown[]
}
