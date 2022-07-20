// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { DefaultNeverOptions } from './_/NeverOptions.js'
import type { CustomNever } from './CustomNever.js'
import { Never_ } from './Never_.js'

type NeverConstructor = new () => Never

export type Never = CustomNever<DefaultNeverOptions>
export const Never = Never_ as unknown as NeverConstructor

export const never = lazyValue(() => new Never())
