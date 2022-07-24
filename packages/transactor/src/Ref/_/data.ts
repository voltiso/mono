// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PathMatches } from '../../common/PathMatches.js'
import type { Method } from '../../Method.js'

export type TriggerEntry<T> = {
	trigger: T
	pathMatches: PathMatches
}

export type MethodEntry = {
	method: Method
	name: string
	pathMatches: PathMatches
}
