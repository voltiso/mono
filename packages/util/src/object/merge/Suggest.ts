// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '~/type'

export type SuggestObject<T extends object> =
	| {
			[k in keyof T]?: Suggest<T[k]>
	  }
	| AlsoAccept<object>

export type Suggest<T> = [T] extends [object]
	? SuggestObject<T> | AlsoAccept<unknown>
	: T | AlsoAccept<unknown>
