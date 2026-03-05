// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { nullish } from '~/nullish'
import type { AlsoAccept } from '~/type'

export type SuggestObjectNullish__<T> = {
	[k in keyof T]?: T[k] | AlsoAccept<unknown> // auto-complete doesn't work for the nested value :(
}

export type SuggestObjectNullish_<T> =
	| SuggestObjectNullish__<Extract<T, object>>
	| AlsoAccept<object | nullish>

export type SuggestObjectNullish<T extends object | nullish> =
	SuggestObjectNullish_<T>
