// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '../../type/AlsoAccept.js'

export type SuggestObject_<T> =
	| {
			[k in keyof T]?: SuggestObject_<T[k]>
	  }
	| AlsoAccept<object>

export type SuggestObject<T extends object> = SuggestObject_<T>
