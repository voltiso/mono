// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UNSET } from '_/symbols/unset'

import type { IsAny } from '~/any'

export type IsSet<X, True = true, False = false> =
	IsAny<X> extends true
		? True
		: [X] extends [never]
			? True
			: X extends UNSET
				? False
				: True
