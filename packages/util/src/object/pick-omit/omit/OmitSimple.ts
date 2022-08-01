// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '~'

import type { Omit_ } from './Omit_'
import type { OmitSignatures } from './OmitSignatures'

/** Discards index signatures */
export type OmitSimple_<O, K> = Omit_<OmitSignatures<O>, K>

// O extends object
// 	? PickSimple_<O, Exclude<keyof OmitIndexSignatures<O>, K>>
// 	: never

/** Discards index signatures */
export type OmitSimple<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
> = OmitSimple_<O, K>
