// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsLiteralOfType } from '~/literal'

export type IsNumberLiteral<X, T = true, F = false> = IsLiteralOfType<
	X,
	number,
	T,
	F
>
