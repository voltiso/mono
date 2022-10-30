// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS, SCHEMA_NAME } from '_'
import type { Override } from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	DefaultTupleOptions,
	ISchema,
	SchemaLike,
	TupleOptions,
} from '~'

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
