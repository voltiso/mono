// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { MutableUnknownTupleImpl, ReadonlyUnknownTupleImpl } from '~'

//

export type MutableUnknownTuple = t.MutableUnknownTuple

export const MutableUnknownTuple = lazyConstructor(
	() => MutableUnknownTupleImpl,
) as unknown as t.MutableUnknownTupleConstructor

//

export type ReadonlyUnknownTuple = t.ReadonlyUnknownTuple

export const ReadonlyUnknownTuple = lazyConstructor(
	() => ReadonlyUnknownTupleImpl,
) as unknown as t.ReadonlyUnknownTupleConstructor

//

//

export const readonlyTuple: t.ReadonlyUnknownTuple = lazyValue(
	() => new ReadonlyUnknownTuple(),
)

export const mutableTuple: t.MutableUnknownTuple = lazyValue(
	() => new MutableUnknownTuple(),
)

export const tuple: t.MutableUnknownTuple = mutableTuple
