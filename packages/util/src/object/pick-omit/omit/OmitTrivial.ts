// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '~'

import type { Omit_ } from './Omit_'

/** Does not work with index signatures */
export type OmitTrivial_<O, K> = Omit_<O, K>

/** Discards index signatures */
export type OmitTrivial<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
> = OmitTrivial_<O, K>
