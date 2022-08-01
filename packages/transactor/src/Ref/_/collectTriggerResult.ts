// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { isDefined, undef } from '@voltiso/util'

import type { DataWithoutId } from '~/Data'
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
): DataWithoutId | null {
	const cacheEntry = getCacheEntry(ctx)

	if (isDefined(triggerResult))
		return isDeleteIt(triggerResult)
			? null
			: (withoutId(triggerResult as never, ctx.docRef.id) as never)
	else {
		assert(cacheEntry.data !== undef)
		return cacheEntry.data as never
	}
}
