// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PathMatches } from '~/common'
import type { Method } from '~/Method'
import type { Trigger } from '~/Trigger'

export type DocRefTriggerEntry<T = Trigger> = {
	trigger: T
	pathMatches: PathMatches
}

export type DocRefMethodEntry = {
	method: Method
	name: string
	pathMatches: PathMatches
}
