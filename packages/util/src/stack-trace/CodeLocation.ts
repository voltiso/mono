// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UndefinedFromOptional } from '~/object'

export type CodeLocation = UndefinedFromOptional<{
	path: string
	line?: number
	column?: number
}>
