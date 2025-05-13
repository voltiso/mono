// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyObject } from '@voltiso/util'

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
// eslint-disable-next-line sonarjs/variable-name
const void_ = lazyObject(() => new Void$())

export { void_ as void }
