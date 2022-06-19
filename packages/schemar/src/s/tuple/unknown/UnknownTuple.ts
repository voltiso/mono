import { lazyValue } from '@voltiso/ts-util'
import { CustomUnknownTuple } from './CustomUnknownTuple'
import {
	DefaultMutableUnknownTupleOptions,
	DefaultReadonlyUnknownTupleOptions,
} from './_/UnknownTupleOptions'
import { MutableUnknownTuple_, ReadonlyUnknownTuple_ } from './UnknownTuple_'

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
