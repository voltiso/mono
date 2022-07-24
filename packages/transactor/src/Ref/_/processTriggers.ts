// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { clone, undef } from '@voltiso/util'

import { withId } from '../../Data'
import { immutabilize } from '../../immutabilize'
import { isDeleteIt, isReplaceIt } from '../../it'
import { triggerGuard } from '../../Transaction'
import type { Updates } from '../../updates'
import { isEqual } from '../../util'
import { apply } from './apply'
import { collectTriggerResult } from './collectTriggerResult'
import type { DocRefContextWithTransaction } from './Context'
import { getAfterTriggers } from './getAfterTriggers'
import { getCacheEntry } from './getCacheEntry'
import { getSchema } from './getSchema'
import { validateAndSetCacheEntry } from './validateAndSetCacheEntry'

async function processAfterTrigger(
	c: DocRefContextWithTransaction,
	idx: number,
): Promise<boolean> {
	const cacheEntry = getCacheEntry(c)
	const afterTriggers = getAfterTriggers.call(c.docRef)
	const schema = getSchema(c.docRef)
	const id = c.docRef.id

	// eslint-disable-next-line security/detect-object-injection
	const afterTrigger = afterTriggers[idx]
	assert(afterTrigger)
	const { trigger, pathMatches } = afterTrigger

	assert(cacheEntry.lastDataSeenByAfters)
	// eslint-disable-next-line security/detect-object-injection
	const prevLastSeen = cacheEntry.lastDataSeenByAfters[idx]
	assert(prevLastSeen !== undef)

	assert(cacheEntry.data !== undef)

	const before = prevLastSeen
	const after = cacheEntry.data

	// console.log('process after trigger', path, before, after)
	if (isEqual(before, after)) return false

	// eslint-disable-next-line security/detect-object-injection
	cacheEntry.lastDataSeenByAfters[idx] = clone(after)

	await triggerGuard(c, async () => {
		assert(cacheEntry.proxy !== undef)

		const r = await trigger.call(cacheEntry.proxy as never, {
			doc: cacheEntry.proxy as never,
			before: immutabilize(withId(before, id)),
			after: immutabilize(withId(after, id)),
			...pathMatches,
			path: c.docRef.path,
			id: id as never,
			...c,
		})
		const data = collectTriggerResult(c, r)
		validateAndSetCacheEntry(c, data, schema?.partial)
	})

	// eslint-disable-next-line security/detect-object-injection
	return !isEqual(cacheEntry.data, cacheEntry.lastDataSeenByAfters[idx])
}

/** Start executing triggers from the beginning if data change is detected */
async function loop(c: DocRefContextWithTransaction) {
	const afterTriggers = getAfterTriggers.call(c.docRef)

	const MAX_ITERS = 1000

	for (let iter = 0; ; ++iter) {
		if (iter >= MAX_ITERS) throw new Error('Trigger loop')

		let change = false

		for (let idx = 0; idx < afterTriggers.length; ++idx) {
			// eslint-disable-next-line no-await-in-loop
			change = await processAfterTrigger(c, idx)

			if (change) break
		}

		if (change) continue

		break
	}
}

type Params = {
	updates?: Updates
}

/**
 * Process triggers implementation
 *
 * @param c - Context
 * @param p - Params
 */
export async function processTriggers(
	c: DocRefContextWithTransaction,
	p?: Params,
) {
	const cacheEntry = getCacheEntry(c)

	cacheEntry.write = true
	assert(cacheEntry.data !== undef)

	const schema = getSchema(c.docRef)

	// const beforeAllTriggers = immutabilize(clone(withId(cacheEntry.data, id)))

	// apply updates
	// eslint-disable-next-line no-lone-blocks
	{
		const data = apply(c, cacheEntry.data, p?.updates)
		assert(!isReplaceIt(data))
		assert(!isDeleteIt(data))
		validateAndSetCacheEntry(c, data, schema?.partial)
	}

	if (cacheEntry.isProcessingTriggers) return

	try {
		cacheEntry.isProcessingTriggers = true
		await loop(c)
	} finally {
		cacheEntry.isProcessingTriggers = false
	}

	validateAndSetCacheEntry(c, cacheEntry.data, schema?.final)
}
