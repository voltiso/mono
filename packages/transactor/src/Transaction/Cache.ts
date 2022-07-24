// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DataWithoutId } from '../Data'
import type { Doc_ } from '../Doc'
import type { WithDocRef } from '../Ref'
import type { Updates } from '../updates'
import type { WithTransaction } from './WithTransaction.js'

export type CacheEntry = {
	data?: DataWithoutId | null // undefined -> unknown; null -> deleted
	originalData?: DataWithoutId | null
	updates?: Updates
	proxy?: Doc_ | null // undefined -> unknown; null -> deleted
	__voltiso?: { numRefs: number }

	write: boolean
	lastDataSeenByAfters?: (DataWithoutId | null)[]
	isProcessingTriggers: boolean
}

export type Cache = Record<string, CacheEntry>

export const newCacheEntry = (
	_ctx: WithDocRef & WithTransaction,
): CacheEntry => {
	// const befores = getBeforeTriggers.call(ctx.docPath)
	return {
		write: false,
		isProcessingTriggers: false,
	}
}
