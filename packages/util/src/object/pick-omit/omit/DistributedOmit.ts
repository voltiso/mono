// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '~/type'

/**
 * Same as built-in Omit, but no template argument constraint on K
 *
 * - Does not work with index signatures
 */
export type $Omit_<O, K extends keyof any> = O extends any ? Omit<O, K> : never

/** Discards index signatures */
export type $Omit<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>,
> = $Omit_<O, K>
