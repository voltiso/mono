import { lazyValue } from '@voltiso/ts-util'
import { CustomUnknown } from './CustomUnknown'
import { Unknown_ } from './Unknown_'
import { DefaultUnknownOptions } from './_/UnknownOptions'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Unknown extends CustomUnknown<DefaultUnknownOptions> {}

export const Unknown = Unknown_ as unknown as UnknownConstructor

type UnknownConstructor = new () => Unknown

export const unknown = lazyValue(() => new Unknown())
