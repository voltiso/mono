// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { DefaultVoidOptions } from './_/VoidOptions.js'
import type { CustomVoid } from './CustomVoid.js'
import { Void_ } from './Void_.js'

type VoidConstructor = new () => Void

export type Void = CustomVoid<DefaultVoidOptions>
export const Void = Void_ as unknown as VoidConstructor

const void_ = lazyValue(() => new Void())

export { void_ as void }
