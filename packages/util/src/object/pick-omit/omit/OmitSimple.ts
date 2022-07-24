// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '../../../type/AlsoAccept.js'
import type { Omit_ } from './Omit_.js'
import type { OmitSignatures } from './OmitSignatures.js'

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
