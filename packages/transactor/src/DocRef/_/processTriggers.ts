// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jsdoc/informative-docs */

import { assert } from '@voltiso/assertor'
import { deepFrozen, isDefined, isDeleteIt, isReplaceIt } from '@voltiso/util'
import { deepCloneData } from '@voltiso/util.firestore'

import { withId } from '~/Data'
import { TransactorError } from '~/error'
import { triggerGuard } from '~/Transaction'
import type { Updates } from '~/updates'
import { isEqual } from '~/util'

import { applyUpdates } from '../methods'
import { collectTriggerResult } from './collectTriggerResult'
import type { DocRefContext } from './Context'
import { getAfterTriggers } from './getAfterTriggers'
import { getCacheEntry } from './getCacheEntry'
import { getSchema } from './getSchema'
import { validateAndSetCacheEntry } from './validateAndSetCacheEntry'

async function processAfterTrigger(
	ctx: DocRefContext.AlsoWithTransaction,
	idx: number,
): Promise<boolean> {
	const cacheEntry = getCacheEntry(ctx)
	const afterTriggers = getAfterTriggers(ctx.docRef)
	const schema = getSchema(ctx.docRef)
	const id = ctx.docRef.id

	const afterTrigger = afterTriggers[idx]
	assert(afterTrigger)
	const { trigger, pathMatches } = afterTrigger

	// console.log({ lastDataSeen: cacheEntry.lastDataSeenByAfters })

	assert(cacheEntry.lastDataSeenByAfters)

	const prevLastSeen = cacheEntry.lastDataSeenByAfters[idx]
	assert.defined(prevLastSeen)

	assert.defined(cacheEntry.data)

	const before = prevLastSeen
	const after = cacheEntry.data

	// console.log('process after trigger', before, after)
	if (isEqual(before, after)) return false

	cacheEntry.lastDataSeenByAfters[idx] = deepCloneData(after)

	await triggerGuard(ctx, async () => {
		assert.defined(cacheEntry.proxy)

		assert(cacheEntry.__voltiso)

		const r = await trigger.call(cacheEntry.proxy as never, {
			doc: cacheEntry.proxy as never,

			__voltiso: cacheEntry.__voltiso as never,

			before: deepFrozen(withId(before, id)), // immutabilize(withId(before, id)) as never,
			after: deepFrozen(withId(after, id)), // immutabilize(withId(after, id)) as never,
			...pathMatches,
			path: ctx.docRef.path as never,
			id: id as never,
			...(ctx as { [k in keyof typeof ctx]: never }),
			possiblyExists: cacheEntry.possiblyExists,
		})
		const data = collectTriggerResult(ctx, r as never)
		validateAndSetCacheEntry(ctx, { data, schema, bestEffort: true })
	})

	return !isEqual(cacheEntry.data, cacheEntry.lastDataSeenByAfters[idx])
}

/** Start executing triggers from the beginning if data change is detected */
async function loop(ctx: DocRefContext.AlsoWithTransaction) {
	const afterTriggers = getAfterTriggers(ctx.docRef as never)

	const MAX_ITERS = 1_000

	// console.log('processTriggers loop', afterTriggers.length, ctx.docRef.path.toString())

	// eslint-disable-next-line sonarjs/too-many-break-or-continue-in-loop
	for (let iter = 0; ; ++iter) {
		if (iter >= MAX_ITERS) throw new TransactorError('Trigger loop')

		let change = false

		for (let idx = 0; idx < afterTriggers.length; ++idx) {
			// eslint-disable-next-line no-await-in-loop
			change = await processAfterTrigger(ctx, idx)

			if (change) break
		}

		if (change) continue

		break
	}
}

interface Params {
	updates?: Updates
}

/**
 * Process triggers implementation
 *
 * @param ctx - Context
 * @param params - Params
 */
export async function processTriggers(
	ctx: DocRefContext.AlsoWithTransaction,
	params?: Params,
): Promise<void> {
	const cacheEntry = getCacheEntry(ctx)

	cacheEntry.write = true
	assert(cacheEntry.data !== undefined)

	const schema = getSchema(ctx.docRef)

	// apply updates
	const data = isDefined(params?.updates)
		? // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			applyUpdates(cacheEntry.data, params?.updates as never)
		: cacheEntry.data

	assert(!isReplaceIt(data))
	assert(!isDeleteIt(data))
	// console.log('apply updates', cacheEntry.data, params?.updates, data)
	validateAndSetCacheEntry(ctx, {
		data,
		schema,
		bestEffort: true,
		hadUpdates: !!params?.updates,
	})

	if (cacheEntry.isProcessingTriggers) return

	try {
		cacheEntry.isProcessingTriggers = true
		await loop(ctx)
	} finally {
		cacheEntry.isProcessingTriggers = false
	}

	validateAndSetCacheEntry(ctx, {
		data: cacheEntry.data,
		schema,
		hadUpdates: !!params?.updates,
	})
}
