// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { clone, undef } from '@voltiso/util'

import type { WithDocRef } from '../Ref'
import { getAfterTriggers } from '../Ref/_/getAfterTriggers'
import type { CacheEntry } from '../Transaction/Cache'

export const initLastDataSeen = (ctx: WithDocRef, cacheEntry: CacheEntry) => {
	if (cacheEntry.lastDataSeenByAfters) return

	const afterTriggers = getAfterTriggers.call(ctx.docRef)

	assert(cacheEntry.data !== undef)
	const data = clone(cacheEntry.data)
	cacheEntry.lastDataSeenByAfters = afterTriggers.map(_ => data)
}
