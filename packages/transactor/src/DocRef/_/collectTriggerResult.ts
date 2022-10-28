// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { isDefined } from '@voltiso/util'

import { withoutId } from '~/Data'
import { isDeleteIt } from '~/it'
import type { AfterTrigger } from '~/Trigger'

import type { DocRefContextWithTransaction } from './Context'
import { getCacheEntry } from './getCacheEntry'

/**
 * (pure) Returns new data as modified by trigger (trigger may return new data,
 * or set cacheEntry by itself)
 *
 * @param ctx - Context
 * @param triggerResult - Trigger result
 * @returns New data
 */
export function collectTriggerResult(
	ctx: DocRefContextWithTransaction,
	triggerResult: Awaited<ReturnType<AfterTrigger>>,
): object | null {
	const cacheEntry = getCacheEntry(ctx)

	if (isDefined(triggerResult)) {
		if (isDeleteIt(triggerResult)) return null

		// if we allow id fields (compat?), do not strip `id`
		const { allowIdField, allowValidIdField } = ctx.transactor._options
		if (allowIdField || allowValidIdField) return triggerResult as never

		return withoutId(triggerResult as never, ctx.docRef.id) as never
	} else {
		assert.defined(cacheEntry.data)
		return cacheEntry.data as never
	}
}
