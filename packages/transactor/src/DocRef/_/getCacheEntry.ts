// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/util'

import type { CacheEntry } from '~/Transaction'

import type { DocRefContext } from './Context'

/**
 * Assert cacheEntry exists for c.docPath, and return it
 *
 * @param ctx - Context
 * @returns CacheEntry
 */
export function getCacheEntry(
	ctx: DocRefContext.ContextWithTransaction,
): CacheEntry {
	const path = ctx.docRef.path.toString()
	const cacheEntry = ctx.transaction._cache.get(path)
	assert(cacheEntry)
	return cacheEntry
}
