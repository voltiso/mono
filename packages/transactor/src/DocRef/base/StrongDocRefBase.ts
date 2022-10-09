// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocLike } from '~/Doc'

import type { UnknownDocRefBase } from './UnknownDocRefBase'

/** Target always exists, ref-counted */
export type StrongDocRefBase<D extends DocLike> = UnknownDocRefBase<D, true>
