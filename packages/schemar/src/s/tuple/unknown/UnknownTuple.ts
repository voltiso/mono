// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type {
	DefaultMutableUnknownTupleOptions,
	DefaultReadonlyUnknownTupleOptions,
} from './_/UnknownTupleOptions.js'
import type { CustomUnknownTuple } from './CustomUnknownTuple.js'
import { MutableUnknownTuple_, ReadonlyUnknownTuple_ } from './UnknownTuple_.js'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MutableUnknownTuple
	extends CustomUnknownTuple<DefaultMutableUnknownTupleOptions> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReadonlyUnknownTuple
	extends CustomUnknownTuple<DefaultReadonlyUnknownTupleOptions> {}

//

export const MutableUnknownTuple =
	MutableUnknownTuple_ as unknown as MutableUnknownTupleConstructor

export const ReadonlyUnknownTuple =
	ReadonlyUnknownTuple_ as unknown as ReadonlyUnknownTupleConstructor

//

type MutableUnknownTupleConstructor = new () => MutableUnknownTuple
type ReadonlyUnknownTupleConstructor = new () => ReadonlyUnknownTuple

//

export const readonlyTuple = lazyValue(() => new ReadonlyUnknownTuple())
export const mutableTuple = lazyValue(() => new MutableUnknownTuple())

export const tuple = mutableTuple
