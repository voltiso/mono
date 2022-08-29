import type { Type_ } from '~/GetType'
import type { InferSchema_ } from '~/InferSchema'
import type { SchemableLike } from '~/Schemable'
import type { CustomArray } from './CustomArray'

export interface MutableArray<S extends SchemableLike>
	extends CustomArray<{
		element: InferSchema_<S>
		Output: Type_<S, { kind: 'out' }>[]
		Input: Type_<S, { kind: 'in' }>[]
	}> {
	<S extends SchemableLike>(elementSchema: S): MutableArray<S>
}

export interface ReadonlyArray<S extends SchemableLike>
	extends CustomArray<{
		element: InferSchema_<S>
		Output: readonly Type_<S, { kind: 'out' }>[]
		Input: readonly Type_<S, { kind: 'in' }>[]
		isReadonlyArray: true
	}> {
	<S extends SchemableLike>(elementSchema: S): ReadonlyArray<S>
}
