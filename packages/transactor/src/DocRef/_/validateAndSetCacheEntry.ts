// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/util'

import { withVoltisoEntry } from '~/Data'
import type { IntrinsicFieldsSchema } from '~/schemas'
import { setCacheEntry } from '~/Transaction'

import { applySchema } from './applySchema'
import type { DocRefContext } from './Context'
import { getCacheEntry } from './getCacheEntry'

/**
 * Validate and update cache entry
 *
 * @throws An error when validation fails
 */
export function validateAndSetCacheEntry(
	context: DocRefContext.ContextWithTransaction,
	options: {
		data: object | null
		schema: IntrinsicFieldsSchema | null // DeepPartialIntrinsicFieldsSchema
		hadUpdates?: boolean | undefined
		bestEffort?: boolean | undefined
	},
): void {
	let { data } = options
	const { schema } = options
	const bestEffort = options.bestEffort ?? false
	const hadUpdates = options.hadUpdates ?? true
	const cacheEntry = getCacheEntry(context)

	try {
		data = applySchema(context, { data, schema, bestEffort }) as never
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

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (data) data = withVoltisoEntry(data)

	setCacheEntry(context, cacheEntry, data, hadUpdates)
}
