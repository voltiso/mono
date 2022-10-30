// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '~'
import type { Type_ } from '~/GetType'
import type { InferSchema_ } from '~/InferSchema'
import type { $$Schemable } from '~/Schemable'

import type { CustomArray } from './CustomArray'

export interface MutableArray<S extends $$Schemable>
	extends CustomArray<{
		element: InferSchema_<S>
		Output: Type_<S, { kind: 'out' }>[]
		Input: Type_<S, { kind: 'in' }>[]
	}> {
	<S extends $$Schemable>(elementSchema: S): t.MutableArray<S>
}

export interface ReadonlyArray<S extends $$Schemable>
	extends CustomArray<{
		element: InferSchema_<S>

		Output: readonly Type_<S, { kind: 'out' }>[]
		Input: readonly Type_<S, { kind: 'in' }>[]

		isReadonlyArray: true
	}> {
	<S extends $$Schemable>(elementSchema: S): t.ReadonlyArray<S>
}
