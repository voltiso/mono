// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IntrinsicFields, PartialIntrinsicFields } from '~'
import type { DocImpl } from '~/Doc'
import type { WithDocRef } from '~/Ref'
import type { Updates } from '~/updates'

import type { WithTransaction } from './WithTransaction'

export type CacheEntry = {
	data?: PartialIntrinsicFields | null | undefined // undefined -> unknown; null -> deleted
	originalData?: PartialIntrinsicFields | null | undefined
	updates?: Updates
	proxy?: DocImpl | null // undefined -> unknown; null -> deleted
	__voltiso?: IntrinsicFields['__voltiso']

	write: boolean
	lastDataSeenByAfters?: (PartialIntrinsicFields | null)[]
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
