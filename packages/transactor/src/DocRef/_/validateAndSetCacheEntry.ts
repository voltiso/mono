// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/util'

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
 * @throws An error when validation fails
 */
export function validateAndSetCacheEntry(
	context: DocRefContextWithTransaction,
	data: object | null,
	schema: object | null | undefined,
	hadUpdates = true,
): void {
	const cacheEntry = getCacheEntry(context)

	try {
		// eslint-disable-next-line no-param-reassign
		data = validate(context, data, schema as never)
	} catch (error) {
		assert(
			error instanceof Error,
			'validateAndSetCacheEntry: exotic error caught',
		)
		error.message = `validateAndSetCacheEntry(${context.docRef.path.toString()}): ${
			error.message
		}`
		throw error // re-throw
	}

	// eslint-disable-next-line no-param-reassign
	if (data) data = withVoltisoEntry(data)
	setCacheEntry(context, cacheEntry, data as never, hadUpdates)
}
