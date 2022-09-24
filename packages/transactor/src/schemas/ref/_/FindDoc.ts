// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocLike } from '~/Doc'
import type { DocTypes } from '~/DocTypes-module-augmentation'

export type FindDoc<X> = X extends DocLike
	? X
	: X extends keyof DocTypes
	? DocTypes[X]
	: never
