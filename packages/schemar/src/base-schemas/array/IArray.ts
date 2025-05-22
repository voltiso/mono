// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '@voltiso/util'

import type { $$Schema, ArrayOptions, Schema, Schema$, SchemaLike } from '~'

export interface $$Array extends $$Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Array'
}

export interface ArrayLike<T extends readonly unknown[] = readonly unknown[]>
	extends $$Array,
		SchemaLike<T> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Array'
}

//

export interface IArray extends $$Array, Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Array'

	[OPTIONS]: ArrayOptions

	readonly getElementSchema: $$Schema
	readonly isReadonlyArray: boolean
	readonly getMinLength: number | undefined
	readonly getMaxLength: number | undefined
}

export interface IArray$ extends $$Array, Schema$ {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Array'

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
