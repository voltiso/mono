// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/array-type */

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	CustomArray,
	InferSchema_,
	SchemableLike,
	Type_,
	Unknown,
} from '~'
import { MutableArrayImpl, ReadonlyArrayImpl, unknown } from '~'

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

//

export const ReadonlyArray = lazyConstructor(
	() => ReadonlyArrayImpl,
) as unknown as ReadonlyArrayConstructor

export const MutableArray = lazyConstructor(
	() => MutableArrayImpl,
) as unknown as MutableArrayConstructor

//

type ReadonlyArrayConstructor = new <T extends SchemableLike>(
	elementType: T,
) => ReadonlyArray<T>

type MutableArrayConstructor = new <T extends SchemableLike>(
	elementType: T,
) => MutableArray<T>

//

export const readonlyArray: ReadonlyArray<Unknown> = lazyValue(
	() => new ReadonlyArray(unknown) as never,
)
export const mutableArray: MutableArray<Unknown> = lazyValue(
	() => new MutableArray(unknown) as never,
)

export const array: MutableArray<Unknown> = lazyValue(() => mutableArray)
