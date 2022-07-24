// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'

import type { DocRefContextWithTransaction } from './Context.js'

/**
 * Assert cacheEntry exists for c.docPath, and return it
 *
 * @param c - Context
 * @returns CacheEntry
 */
export function getCacheEntry(c: DocRefContextWithTransaction) {
	const path = c.docRef.path.pathString
	// eslint-disable-next-line security/detect-object-injection
	const cacheEntry = c.transaction._cache[path]
	assert(cacheEntry)
	return cacheEntry
}
