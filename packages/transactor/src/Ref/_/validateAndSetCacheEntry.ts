// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'

import type { DataWithoutId } from '../../Data'
import { setCacheEntry } from '../../Transaction'
import type { DocRefContextWithTransaction } from './Context.js'
import { getCacheEntry } from './getCacheEntry.js'
import { validate } from './validate.js'

/**
 * Validate and update cache entry
 *
 * @param context - Context
 * @param data - Data to validate
 * @param schema - Either full or partial schema
 */
export function validateAndSetCacheEntry(
	context: DocRefContextWithTransaction,
	data: DataWithoutId | null,
	schema: s.Schema<object> | null | undefined,
): void {
	const cacheEntry = getCacheEntry(context)
	// eslint-disable-next-line no-param-reassign
	data = validate(context, data, schema)
	setCacheEntry.call(context, cacheEntry, data)
}
