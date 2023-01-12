// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { $$Schemable, CustomArray, InferSchema_, Type_ } from '~'

import { unknown } from '../unknown'
import { MutableArrayImpl } from './MutableArrayImpl'
import { ReadonlyArrayImpl } from './ReadonlyArrayImpl'

//

interface MutableArray_<S extends $$Schemable>
	extends CustomArray<{
		element: InferSchema_<S>
		Output: Type_<S, { kind: 'out' }>[]
		Input: Type_<S, { kind: 'in' }>[]
	}> {}

export { MutableArray_ as MutableArray }

//

interface ReadonlyArray_<S extends $$Schemable>
	extends CustomArray<{
		element: InferSchema_<S>

		Output: readonly Type_<S, { kind: 'out' }>[]
		Input: readonly Type_<S, { kind: 'in' }>[]

		isReadonlyArray: true
	}> {}

export { ReadonlyArray_ as ReadonlyArray }

//

const ReadonlyArray_ = lazyConstructor(
	() => ReadonlyArrayImpl,
) as unknown as ReadonlyArrayConstructor

const MutableArray_ = lazyConstructor(
	() => MutableArrayImpl,
) as unknown as MutableArrayConstructor

//

export type ReadonlyArrayConstructor = new <T extends $$Schemable>(
	elementType: T,
) => ReadonlyArray_<T>

export type MutableArrayConstructor = new <T extends $$Schemable>(
	elementType: T,
) => MutableArray_<T>

//

export interface UnknownMutableArray
	extends CustomArray<{
		isReadonlyArray: false

		Output: unknown[]
		Input: unknown[]
	}> {
	<S extends $$Schemable>(elementSchema: S): MutableArray_<S>
}

export interface UnknownReadonlyArray
	extends CustomArray<{
		isReadonlyArray: true
	}> {
	<S extends $$Schemable>(elementSchema: S): ReadonlyArray_<S>
}

export const readonlyArray: UnknownReadonlyArray = lazyValue(
	() => new ReadonlyArray_(unknown) as never,
)
export const mutableArray: UnknownMutableArray = lazyValue(
	() => new MutableArray_(unknown) as never,
)

export const array = lazyValue(() => mutableArray)
