// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/array-type */

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { MutableArrayImpl, ReadonlyArrayImpl, unknown } from '~'

//

export type ReadonlyArray<S extends t.SchemableLike> = t.ReadonlyArray<S>

export const ReadonlyArray = lazyConstructor(
	() => ReadonlyArrayImpl,
) as unknown as ReadonlyArrayConstructor

export const MutableArray = lazyConstructor(
	() => MutableArrayImpl,
) as unknown as MutableArrayConstructor

//

type ReadonlyArrayConstructor = new <T extends t.SchemableLike>(
	elementType: T,
) => ReadonlyArray<T>

type MutableArrayConstructor = new <T extends t.SchemableLike>(
	elementType: T,
) => t.MutableArray<T>

//

export const readonlyArray: ReadonlyArray<t.Unknown> = lazyValue(
	() => new ReadonlyArray(unknown) as never,
)
export const mutableArray: t.MutableArray<t.Unknown> = lazyValue(
	() => new MutableArray(unknown) as never,
)

export const array: t.MutableArray<t.Unknown> = lazyValue(() => mutableArray)
