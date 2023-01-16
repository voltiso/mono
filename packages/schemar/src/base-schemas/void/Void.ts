// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomVoid, CustomVoid$ } from '~'

import { VoidImpl } from './detail'

//

export type Void = CustomVoid<{}>
export type Void$ = CustomVoid$<{}>

export const Void$ = lazyConstructor(
	() => VoidImpl,
) as unknown as Void$Constructor

export type Void$Constructor = new () => Void$

//
const void_ = lazyValue(() => new Void$())

export { void_ as void }
