import type { SchemableLike } from '~/Schemable'
import type { CustomUnknownTuple } from './CustomUnknownTuple'
import type { GetTuple } from './GetTuple'

export interface MutableUnknownTuple
	extends CustomUnknownTuple<{ isReadonlyTuple: false }> {
	<T extends readonly SchemableLike[]>(...elementTypes: T): GetTuple<
		this,
		[...T]
	>
}

export interface ReadonlyUnknownTuple
	extends CustomUnknownTuple<{
		isReadonlyTuple: true
		Output: readonly unknown[]
		Input: readonly unknown[]
	}> {
	<T extends readonly SchemableLike[]>(...elementTypes: T): GetTuple<
		this,
		[...T]
	>
}

export type MutableUnknownTupleConstructor = new () => MutableUnknownTuple
export type ReadonlyUnknownTupleConstructor = new () => ReadonlyUnknownTuple
