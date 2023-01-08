// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { deepCloneData } from '@voltiso/util.firestore'

import type { WithDocRef } from '~/DocRef'
import { getAfterTriggers } from '~/DocRef'
import type { CacheEntry } from '~/Transaction/Cache'

import type { IntrinsicFields } from '..'

export function initLastDataSeen(ctx: WithDocRef, cacheEntry: CacheEntry) {
	if (cacheEntry.lastDataSeenByAfters || cacheEntry.originalData === undefined)
		return

	const afterTriggers = getAfterTriggers(ctx.docRef as never)

	const data = deepCloneData(cacheEntry.originalData)
	cacheEntry.lastDataSeenByAfters = Array.from<IntrinsicFields | null>({
		length: afterTriggers.length,
	}).fill(data)
}
