// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/array-type */

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomArray, GetSchema_, GetType_, Schemable_, Unknown } from '~'
import { MutableArrayImpl, ReadonlyArrayImpl, unknown } from '~'

export interface MutableArray<S extends Schemable_>
	extends CustomArray<{
		element: GetSchema_<S>
		Output: GetType_<S, { kind: 'out' }>[]
		Input: GetType_<S, { kind: 'in' }>[]
	}> {
	<S extends Schemable_>(elementSchema: S): MutableArray<S>
}

export interface ReadonlyArray<S extends Schemable_>
	extends CustomArray<{
		element: GetSchema_<S>
		Output: readonly GetType_<S, { kind: 'out' }>[]
		Input: readonly GetType_<S, { kind: 'in' }>[]
		isReadonlyArray: true
	}> {
	<S extends Schemable_>(elementSchema: S): ReadonlyArray<S>
}

//

export const ReadonlyArray = lazyConstructor(
	() => ReadonlyArrayImpl,
) as unknown as ReadonlyArrayConstructor

export const MutableArray = lazyConstructor(
	() => MutableArrayImpl,
) as unknown as MutableArrayConstructor

//

type ReadonlyArrayConstructor = new <T extends Schemable_>(
	elementType: T,
) => ReadonlyArray<T>

type MutableArrayConstructor = new <T extends Schemable_>(
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
