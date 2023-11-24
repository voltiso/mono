// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '@voltiso/util'

import type { $$Schema, Schema, SCHEMA_NAME, Schema$, SchemaLike } from '~'

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

export interface IArray extends $$Array, Schema {
	readonly [SCHEMA_NAME]: 'Array'

	[OPTIONS]: ArrayOptions

	readonly getElementSchema: $$Schema
	readonly isReadonlyArray: boolean
	readonly getMinLength: number | undefined
	readonly getMaxLength: number | undefined
}

export interface IArray$ extends $$Array, Schema$ {
	readonly [SCHEMA_NAME]: 'Array'

	[OPTIONS]: ArrayOptions

	readonly getElementSchema: $$Schema
	readonly isReadonlyArray: boolean
	readonly getMinLength: number | undefined
	readonly getMaxLength: number | undefined

	readonly readonlyArray: IArray$
	readonly mutableArray: IArray$
}

//

export interface IReadonlyArray extends IArray {}

export interface IMutableArray extends IArray {
	get Type(): unknown[]
	get Output(): unknown[]
	get Input(): unknown[]
}
