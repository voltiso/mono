// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny } from '~/any'

import type { NoArgument } from './OptionalArgument'

export type IsProvided<X, True = true, False = false> =
	IsAny<X> extends true
		? True
		: [X] extends [never]
			? True
			: X extends NoArgument
				? False
				: True
