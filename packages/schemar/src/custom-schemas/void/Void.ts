// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { VoidImpl } from './detail'

export type Void = t.Void
export const Void = lazyConstructor(
	() => VoidImpl,
) as unknown as t.VoidConstructor

const void_ = lazyValue(() => new Void())

export { void_ as void }
