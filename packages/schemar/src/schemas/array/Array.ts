// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/array-type */

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomArray, GetSchema_, GetType_, Schemable } from '~'
import { MutableArrayImpl, ReadonlyArrayImpl } from '~'
import * as s from '~/schemas'

export interface MutableArray<S extends Schemable>
	extends CustomArray<{
		element: GetSchema_<S>
		Output: GetType_<S, { kind: 'out' }>[]
		Input: GetType_<S, { kind: 'in' }>[]
	}> {
	<S extends Schemable>(elementSchema: S): MutableArray<S>
}

export interface ReadonlyArray<S extends Schemable>
	extends CustomArray<{
		element: GetSchema_<S>
		Output: readonly GetType_<S, { kind: 'out' }>[]
		Input: readonly GetType_<S, { kind: 'in' }>[]
		isReadonlyArray: true
	}> {
	<S extends Schemable>(elementSchema: S): ReadonlyArray<S>
}

//

export const ReadonlyArray = lazyConstructor(
	() => ReadonlyArrayImpl,
) as unknown as ReadonlyArrayConstructor

export const MutableArray = lazyConstructor(
	() => MutableArrayImpl,
) as unknown as MutableArrayConstructor

//

type ReadonlyArrayConstructor = new <T extends Schemable>(
	elementType: T,
) => ReadonlyArray<T>

type MutableArrayConstructor = new <T extends Schemable>(
	elementType: T,
) => MutableArray<T>

//

export const readonlyArray: ReadonlyArray<s.Unknown> = lazyValue(
	() => new ReadonlyArray(s.unknown) as never,
)
export const mutableArray: MutableArray<s.Unknown> = lazyValue(
	() => new MutableArray(s.unknown) as never,
)

export const array: MutableArray<s.Unknown> = lazyValue(() => mutableArray)
