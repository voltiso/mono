// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomVoid } from '~'
import { VoidImpl } from '~'

type VoidConstructor = new () => Void

export type Void = CustomVoid<{}>
export const Void = lazyConstructor(
	() => VoidImpl,
) as unknown as VoidConstructor

const void_ = lazyValue(() => new Void())

export { void_ as void }
