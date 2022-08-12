// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IntrinsicFields } from '~'
import type { Doc_ } from '~/Doc'
import type { WithDocRef } from '~/Ref'
import type { Updates } from '~/updates'

import type { WithTransaction } from './WithTransaction'

export type CacheEntry = {
	data?: IntrinsicFields | null | undefined // undefined -> unknown; null -> deleted
	originalData?: IntrinsicFields | null | undefined
	updates?: Updates
	proxy?: Doc_ | null // undefined -> unknown; null -> deleted
	__voltiso?: { numRefs: number }

	write: boolean
	lastDataSeenByAfters?: (IntrinsicFields | null)[]
	isProcessingTriggers: boolean
}

export type Cache = Map<string, CacheEntry>

export function newCacheEntry(_ctx: WithDocRef & WithTransaction): CacheEntry {
	// const befores = getBeforeTriggers.call(ctx.docPath)
	return {
		write: false,
		isProcessingTriggers: false,
	}
}
