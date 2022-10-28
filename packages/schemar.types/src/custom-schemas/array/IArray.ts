// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS, SCHEMA_NAME } from '_'

import type { $$Schema, ISchema, SchemaLike } from '~'

import type { ArrayOptions } from '.'

export interface $$Array extends $$Schema {
	readonly [SCHEMA_NAME]: 'Array'
}

export interface ArrayLike<T extends readonly unknown[] = readonly unknown[]>
	extends $$Array,
		SchemaLike<T> {
	//
	readonly [SCHEMA_NAME]: 'Array'
}

//

export interface IArray extends $$Array, ISchema<readonly unknown[]> {
	readonly [SCHEMA_NAME]: 'Array'

	[OPTIONS]: ArrayOptions

	readonly getElementSchema: $$Schema
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
