import type { _TupleTypeImpl } from '~/GetType'
import type { SchemableLike } from '~/Schemable'
import type { CustomTuple } from './CustomTuple'

export interface MutableTuple<T extends SchemableLike[]>
	extends CustomTuple<{
		shape: T
		Output: _TupleTypeImpl<T, { kind: 'out'; readonlyTuple: false }>
		Input: _TupleTypeImpl<T, { kind: 'in'; readonlyTuple: false }>
	}> {}

export interface ReadonlyTuple<T extends SchemableLike[]>
	extends CustomTuple<{
		shape: T
		Output: _TupleTypeImpl<T, { kind: 'out'; readonlyTuple: true }>
		Input: _TupleTypeImpl<T, { kind: 'in'; readonlyTuple: true }>
		isReadonlyTuple: true
	}> {}

export type MutableTupleConstructor = new <T extends SchemableLike[]>(
	...shape: T
) => MutableTuple<T>

export type ReadonlyTupleConstructor = new <T extends SchemableLike[]>(
	...shape: T
) => ReadonlyTuple<T>
