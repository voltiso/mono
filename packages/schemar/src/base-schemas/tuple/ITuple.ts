// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type { $$Schema, $$Schemable, Schema, Schema$, SchemaLike } from '~'

import type { TupleOptions } from './TupleOptions'

export interface $$Tuple extends $$Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Tuple'
}

export interface TupleLike<T extends readonly unknown[] = readonly unknown[]>
	extends $$Tuple,
		SchemaLike<T> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Tuple'
}

//

export interface ITuple<T extends readonly unknown[] = readonly unknown[]>
	extends $$Tuple,
		TupleLike<T>,
		Schema<T> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Tuple'

	readonly [Voltiso.BASE_OPTIONS]: TupleOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: TupleOptions.Default

	readonly [Voltiso.OPTIONS]: TupleOptions<T>

	get isReadonlyTuple(): boolean
	get getShape(): $$Schemable[]
	get getLength(): number
}

export interface ITuple$<T extends readonly unknown[] = readonly unknown[]>
	extends $$Tuple,
		TupleLike<T>,
		Schema$<T> {
	//
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Tuple'

	readonly [Voltiso.BASE_OPTIONS]: TupleOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: TupleOptions.Default

	readonly [Voltiso.OPTIONS]: TupleOptions<T>

	get isReadonlyTuple(): boolean
	get getShape(): $$Schemable[]
	get getLength(): number

	//

	get Final(): ITuple<T>

	//

	get readonlyTuple(): ITuple$
	get mutableTuple(): ITuple$
}

//

export interface IReadonlyTuple extends ITuple {
	readonly [Voltiso.OPTIONS]: $Override_<
		TupleOptions,
		{ isMutableTuple: false }
	>
}

export interface IReadonlyTuple$ extends ITuple$ {
	readonly [Voltiso.OPTIONS]: $Override_<
		TupleOptions,
		{ isMutableTuple: false }
	>
}

//

export interface IMutableTuple extends ITuple {
	readonly [Voltiso.OPTIONS]: $Override_<TupleOptions, { isMutableTuple: true }>

	get Type(): unknown[]
	get Output(): unknown[]
	get Input(): unknown[]
}

export interface IMutableTuple$ extends ITuple$ {
	readonly [Voltiso.OPTIONS]: $Override_<TupleOptions, { isMutableTuple: true }>

	get Type(): unknown[]
	get Output(): unknown[]
	get Input(): unknown[]
}
