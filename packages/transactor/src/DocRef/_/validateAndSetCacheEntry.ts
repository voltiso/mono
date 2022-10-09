// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { withVoltisoEntry } from '~/Data'
import { setCacheEntry } from '~/Transaction'

import type { DocRefContextWithTransaction } from './Context'
import { getCacheEntry } from './getCacheEntry'
import { validate } from './validate'

/**
 * Validate and update cache entry
 *
 * @param context - Context
 * @param data - Data to validate
 * @param schema - Either full or partial schema
 */
export function validateAndSetCacheEntry(
	context: DocRefContextWithTransaction,
	data: object | null,
	schema: object | null | undefined,
	hadUpdates = true,
): void {
	const cacheEntry = getCacheEntry(context)
	// eslint-disable-next-line no-param-reassign
	data = validate(context, data, schema as never)
	// eslint-disable-next-line no-param-reassign
	if (data) data = withVoltisoEntry(data)
	setCacheEntry(context, cacheEntry, data as never, hadUpdates)
}
