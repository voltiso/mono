// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '~/type'

import type { $Omit_ } from './DistributedOmit'
import type { OmitSignatures } from './OmitSignatures'

/** Discards index signatures */
export type OmitSimple_<O, K extends keyof any> = $Omit_<OmitSignatures<O>, K>

// O extends object
// 	? PickSimple_<O, Exclude<keyof OmitIndexSignatures<O>, K>>
// 	: never

/** Discards index signatures */
export type OmitSimple<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
> = OmitSimple_<O, K>
