// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocRefContextWithTransaction } from './Context'

/**
 * Assert cacheEntry exists for c.docPath, and return it
 *
 * @param ctx - Context
 * @returns CacheEntry
 */
export function getCacheEntry(ctx: DocRefContextWithTransaction) {
	const path = ctx.docRef.path.pathString
	const cacheEntry = ctx.transaction._cache.get(path)
	$assert(cacheEntry)
	return cacheEntry
}
