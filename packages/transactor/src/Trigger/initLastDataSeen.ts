// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { deepCloneData } from '@voltiso/util.firestore'

import type { WithDocRef } from '~/DocRef'
import { getAfterTriggers } from '~/DocRef'
import type { CacheEntry } from '~/Transaction/Cache'

export function initLastDataSeen(ctx: WithDocRef, cacheEntry: CacheEntry) {
	if (cacheEntry.lastDataSeenByAfters || cacheEntry.originalData === undefined)
		return

	const afterTriggers = getAfterTriggers(ctx.docRef)

	const data = deepCloneData(cacheEntry.originalData)
	cacheEntry.lastDataSeenByAfters = afterTriggers.map(_ => data)
}
