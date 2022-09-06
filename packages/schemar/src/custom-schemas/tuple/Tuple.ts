// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { MutableTupleImpl, ReadonlyTupleImpl } from '~'

export type MutableTuple<T extends t.SchemableLike[]> = t.MutableTuple<T>
export type ReadonlyTuple<T extends t.SchemableLike[]> = t.ReadonlyTuple<T>

export const MutableTuple = lazyConstructor(
	() => MutableTupleImpl,
) as unknown as t.MutableTupleConstructor

export const ReadonlyTuple = lazyConstructor(
	() => ReadonlyTupleImpl,
) as t.ReadonlyTupleConstructor
