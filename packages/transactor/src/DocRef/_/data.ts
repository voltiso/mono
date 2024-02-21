// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PathMatches } from '~/common'
import type { Method } from '~/Method'
import type { Trigger } from '~/Trigger'

export interface DocRefTriggerEntry<T = Trigger> {
	trigger: T
	pathMatches: PathMatches
}

export interface DocRefMethodEntry {
	method: Method
	name: string
	pathMatches: PathMatches
}
