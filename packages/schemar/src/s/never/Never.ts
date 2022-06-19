import { CustomNever } from './CustomNever'
import { lazyValue } from '@voltiso/ts-util'
import { Never_ } from './Never_'
import { DefaultNeverOptions } from './_/NeverOptions'

type NeverConstructor = new () => Never

export type Never = CustomNever<DefaultNeverOptions>
export const Never = Never_ as unknown as NeverConstructor

export const never = lazyValue(() => new Never())
