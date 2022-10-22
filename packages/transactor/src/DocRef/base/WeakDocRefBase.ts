// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocLike } from '~/Doc'

import type { UnknownDocRefBase_ } from './UnknownDocRefBase'

/** Target may be `null`, not ref-counted */
export type WeakDocRefBase_<D> = UnknownDocRefBase_<D, boolean>

/** Target may be `null`, not ref-counted */
export type WeakDocRefBase<D extends DocLike> = WeakDocRefBase_<D>
