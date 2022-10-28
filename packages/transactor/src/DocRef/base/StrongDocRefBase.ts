// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Doc } from '~/Doc'

import type { UnknownDocRefBase } from './UnknownDocRefBase'

/** Target always exists, ref-counted */
export type StrongDocRefBase<D extends $$Doc> = UnknownDocRefBase<D, true>
