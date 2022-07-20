// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny } from '../any'
import type { NotProvided } from './OptionalArgument.js'

export type IsProvided<X, True = true, False = false> = IsAny<X> extends true
	? True
	: [X] extends [never]
	? True
	: X extends NotProvided
	? False
	: True
