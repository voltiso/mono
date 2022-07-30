// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { CustomUnknownTuple, GetTuple, Schemable } from '~'
import { MutableUnknownTupleImpl, ReadonlyUnknownTupleImpl } from '~'

export interface MutableUnknownTuple
	extends CustomUnknownTuple<{ isReadonlyTuple: false }> {
	<T extends readonly Schemable[]>(...elementTypes: T): GetTuple<this, [...T]>
}

export interface ReadonlyUnknownTuple
	extends CustomUnknownTuple<{
		isReadonlyTuple: true
		Output: readonly unknown[]
		Input: readonly unknown[]
	}> {
	<T extends readonly Schemable[]>(...elementTypes: T): GetTuple<this, [...T]>
}

//

export const MutableUnknownTuple =
	MutableUnknownTupleImpl as unknown as MutableUnknownTupleConstructor

export const ReadonlyUnknownTuple =
	ReadonlyUnknownTupleImpl as unknown as ReadonlyUnknownTupleConstructor

//

type MutableUnknownTupleConstructor = new () => MutableUnknownTuple
type ReadonlyUnknownTupleConstructor = new () => ReadonlyUnknownTuple

//

export const readonlyTuple = lazyValue(() => new ReadonlyUnknownTuple())
export const mutableTuple = lazyValue(() => new MutableUnknownTuple())

export const tuple = mutableTuple
