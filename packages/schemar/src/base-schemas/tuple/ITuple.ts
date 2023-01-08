// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
	Override,
} from '@voltiso/util'

import type { $$Schema, $$Schemable, ISchema, SCHEMA_NAME, SchemaLike } from '~'

import type { DefaultTupleOptions, TupleOptions } from './TupleOptions'

export interface $$Tuple extends $$Schema {
	readonly [SCHEMA_NAME]: 'Tuple'
}

export interface TupleLike<T extends readonly unknown[] = readonly unknown[]>
	extends $$Tuple,
		SchemaLike<T> {
	//
	readonly [SCHEMA_NAME]: 'Tuple'
}

export interface ITuple<T extends readonly unknown[] = readonly unknown[]>
	extends $$Tuple,
		TupleLike<T>,
		ISchema<T> {
	//
	readonly [SCHEMA_NAME]: 'Tuple'

	readonly [BASE_OPTIONS]: TupleOptions
	readonly [DEFAULT_OPTIONS]: DefaultTupleOptions

	readonly [OPTIONS]: TupleOptions<T>

	get isReadonlyTuple(): boolean
	get getShape(): $$Schemable[]
	get getLength(): number

	get readonlyTuple(): $$Tuple
	get mutableTuple(): $$Tuple
}

export interface IReadonlyTuple extends ITuple {
	readonly [OPTIONS]: Override<TupleOptions, { isMutableTuple: false }>
}

export interface IMutableTuple extends ITuple {
	readonly [OPTIONS]: Override<TupleOptions, { isMutableTuple: true }>

	get Type(): unknown[]
	get Output(): unknown[]
	get Input(): unknown[]
}
