// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$Override_,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
} from '@voltiso/util'

import type { $$Schema, $$Schemable, ISchema, SCHEMA_NAME, SchemaLike } from '~'

import type { TupleOptions } from './TupleOptions'

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
	readonly [DEFAULT_OPTIONS]: TupleOptions.Default

	readonly [OPTIONS]: TupleOptions<T>

	get isReadonlyTuple(): boolean
	get getShape(): $$Schemable[]
	get getLength(): number

	get readonlyTuple(): $$Tuple
	get mutableTuple(): $$Tuple
}

export interface IReadonlyTuple extends ITuple {
	readonly [OPTIONS]: $Override_<TupleOptions, { isMutableTuple: false }>
}

export interface IMutableTuple extends ITuple {
	readonly [OPTIONS]: $Override_<TupleOptions, { isMutableTuple: true }>

	get Type(): unknown[]
	get Output(): unknown[]
	get Input(): unknown[]
}
