// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	$$Schemable,
	CustomArray,
	CustomArray$,
	RelaxSchema_,
	Type_,
} from '~'

import { unknown } from '../unknown'
import { MutableArrayImpl } from './MutableArrayImpl'
import { ReadonlyArrayImpl } from './ReadonlyArrayImpl'

//

interface MutableArray_<S extends $$Schemable>
	extends CustomArray<{
		// element: InferSchema$_<S>
		Output: Type_<S, { kind: 'out' }>[]
		Input: Type_<S, { kind: 'in' }>[]
	}> {}

export type { MutableArray_ as MutableArray }

export interface MutableArray$<S extends $$Schemable>
	extends CustomArray$<{
		// element: InferSchema$_<S>
		Output: Type_<S, { kind: 'out' }>[]
		Input: Type_<S, { kind: 'in' }>[]
	}> {}

//

interface ReadonlyArray_<S extends $$Schemable>
	extends CustomArray<{
		// element: InferSchema$_<S>

		Output: readonly Type_<S, { kind: 'out' }>[]
		Input: readonly Type_<S, { kind: 'in' }>[]

		isReadonlyArray: true
	}> {}

export type { ReadonlyArray_ as ReadonlyArray }

export interface ReadonlyArray$<S extends $$Schemable>
	extends CustomArray$<{
		// element: InferSchema$_<S>

		Output: readonly Type_<S, { kind: 'out' }>[]
		Input: readonly Type_<S, { kind: 'in' }>[]

		isReadonlyArray: true
	}> {}

//

const ReadonlyArray$ = lazyConstructor(
	() => ReadonlyArrayImpl,
) as unknown as ReadonlyArray$Constructor

const MutableArray$ = lazyConstructor(
	() => MutableArrayImpl,
) as unknown as MutableArray$Constructor

//

export type ReadonlyArray$Constructor = new <T extends $$Schemable>(
	elementType: T,
) => ReadonlyArray$<T>

export type MutableArray$Constructor = new <T extends $$Schemable>(
	elementType: T,
) => MutableArray$<T>

//

export interface UnknownMutableArray$
	extends CustomArray$<{
		isReadonlyArray: false

		Output: unknown[]
		Input: unknown[]
	}> {
	<S extends $$Schemable>(elementSchema: S): MutableArray$<RelaxSchema_<S>>
}

export interface UnknownReadonlyArray$
	extends CustomArray$<{
		isReadonlyArray: true
	}> {
	<S extends $$Schemable>(elementSchema: S): ReadonlyArray$<S>
}

export const readonlyArray: UnknownReadonlyArray$ = lazyValue(
	() => new ReadonlyArray$(unknown) as never,
)
export const mutableArray: UnknownMutableArray$ = lazyValue(
	() => new MutableArray$(unknown) as never,
)

export const array = lazyValue(() => mutableArray)
