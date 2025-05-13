// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jsdoc/informative-docs */

import { fastAssert } from '@voltiso/util'

import type { CacheEntry } from '~/Transaction'

import type { DocRefContext } from './Context'

/**
 * Assert cacheEntry exists for c.docPath, and return it
 *
 * @param ctx - Context
 * @returns CacheEntry
 */
export function getCacheEntry(
	ctx: DocRefContext.AlsoWithTransaction,
): CacheEntry {
	const path = ctx.docRef.path.toString()
	const cacheEntry = ctx.transaction._cache.get(path)
	fastAssert(cacheEntry)
	return cacheEntry
}
