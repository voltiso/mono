// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocImpl } from '~/Doc'
import type { WithDocRef } from '~/DocRef'
import type { IntrinsicFields } from '~/schemas'
import type { WithTransactor } from '~/Transactor'
import type { Updates } from '~/updates'

import type { WithTransaction } from './WithTransaction'

export type CacheEntry = {
	data?: IntrinsicFields | null | undefined // undefined -> unknown; null -> deleted
	originalData?: IntrinsicFields | null | undefined
	updates?: Updates
	proxy?: DocImpl | null // undefined -> unknown; null -> deleted
	__voltiso?: IntrinsicFields['__voltiso']

	possiblyExists: boolean

	write: boolean
	lastDataSeenByAfters?: (IntrinsicFields | null)[]
	isProcessingTriggers: boolean
}

export type Cache = Map<string, CacheEntry>

export function newCacheEntry(
	_ctx: WithDocRef & WithTransaction & WithTransactor,
): CacheEntry {
	// const befores = getBeforeTriggers.call(ctx.docPath)
	return {
		write: false,
		isProcessingTriggers: false,
		possiblyExists: _ctx.transactor._options.partial,
	}
}
