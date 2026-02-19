// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jsdoc/informative-docs */

import { assert } from '@voltiso/assertor'
import { isDefined, isDeleteIt } from '@voltiso/util'

import { withoutId } from '~/Data'
import type { WithDb } from '~/Db/WithDb'
import { isWithTransaction } from '~/Transaction/WithTransaction'
import type { WithTransactor } from '~/Transactor/WithTransactor'
import type { AfterTrigger } from '~/Trigger'

import type { WithDocRef } from '../WithDocRef'
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
	ctx: WithTransactor & WithDocRef & WithDb,
	triggerResult: Awaited<ReturnType<AfterTrigger>>,
): object | null | undefined {
	if (isDefined(triggerResult)) {
		if (isDeleteIt(triggerResult)) return null

		// if we allow id fields (compat?), do not strip `id`
		const { allowIdField, allowValidIdField } = ctx.transactor._options
		if (allowIdField || allowValidIdField) return triggerResult

		return withoutId(triggerResult, ctx.docRef.id) as never
	} else if (isWithTransaction(ctx)) {
		const cacheEntry = getCacheEntry(ctx)
		assert.defined(cacheEntry.data)
		return cacheEntry.data as never
	} else return undefined
}
