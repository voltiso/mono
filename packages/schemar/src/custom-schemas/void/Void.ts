// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as types from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { VoidImpl } from '~'

export type Void = types.Void
export const Void = lazyConstructor(
	() => VoidImpl,
) as unknown as types.VoidConstructor

const void_ = lazyValue(() => new Void())

export { void_ as void }
