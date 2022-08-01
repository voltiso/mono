// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept, OmitSignatures } from '~'

/** Discards index signatures */
export type PickSimple_<O, K> = Pick<
	OmitSignatures<O>,
	K & keyof OmitSignatures<O>
>

/** Discards index signatures */
export type PickSimple<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
> = PickSimple_<O, K>
