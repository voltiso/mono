// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { MutableTupleImpl } from './MutableTupleImpl'
import { ReadonlyTupleImpl } from './ReadonlyTupleImpl'

export type MutableTuple<T extends t.$$Schemable[]> = t.MutableTuple<T>
export type ReadonlyTuple<T extends t.$$Schemable[]> = t.ReadonlyTuple<T>

export const MutableTuple: t.MutableTupleConstructor = lazyConstructor(
	() => MutableTupleImpl,
) as never

export const ReadonlyTuple: t.ReadonlyTupleConstructor = lazyConstructor(
	() => ReadonlyTupleImpl,
) as never
