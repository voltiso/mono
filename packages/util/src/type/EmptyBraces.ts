// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAlmostSame } from './compare'

//

export type ExtractEmptyBraces<S> = S extends any
	? IsAlmostSame<S, {}> extends true
		? S
		: never
	: never

export type ExcludeEmptyBraces<S> = S extends any
	? IsAlmostSame<S, {}> extends true
		? never
		: S
	: never
