// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PathMatches } from '../../common/PathMatches'
import type { Method } from '../../Method'

export type TriggerEntry<T> = {
	trigger: T
	pathMatches: PathMatches
}

export type MethodEntry = {
	method: Method
	name: string
	pathMatches: PathMatches
}
