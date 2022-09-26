// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import { clone } from '@voltiso/util'

import { withId } from '~/Data'
import { TransactorError } from '~/error'
import { immutabilize } from '~/immutabilize'
import { isDeleteIt, isReplaceIt } from '~/it'
import { triggerGuard } from '~/Transaction'
import type { Updates } from '~/updates'
import { isEqual } from '~/util'

import type { IRef } from '../IRef'
import { apply } from './apply'
import { collectTriggerResult } from './collectTriggerResult'
import type { DocRefContextWithTransaction } from './Context'
import { getAfterTriggers } from './getAfterTriggers'
import { getCacheEntry } from './getCacheEntry'
import { getSchema } from './getSchema'
import { validateAndSetCacheEntry } from './validateAndSetCacheEntry'

async function processAfterTrigger(
	ctx: DocRefContextWithTransaction,
	idx: number,
): Promise<boolean> {
	const cacheEntry = getCacheEntry(ctx)
	const afterTriggers = getAfterTriggers(ctx.docRef)
	const schema = getSchema(ctx.docRef)
	const id = ctx.docRef.id

	// eslint-disable-next-line security/detect-object-injection
	const afterTrigger = afterTriggers[idx]
	$assert(afterTrigger)
	const { trigger, pathMatches } = afterTrigger

	$assert(cacheEntry.lastDataSeenByAfters)
	// eslint-disable-next-line security/detect-object-injection
	const prevLastSeen = cacheEntry.lastDataSeenByAfters[idx]
	$assert(prevLastSeen !== undefined)

	$assert(cacheEntry.data !== undefined)

	const before = prevLastSeen
	const after = cacheEntry.data

	// console.log('process after trigger', before, after)
	if (isEqual(before, after)) return false

	// eslint-disable-next-line security/detect-object-injection
	cacheEntry.lastDataSeenByAfters[idx] = clone(after)

	await triggerGuard(ctx, async () => {
		$assert(cacheEntry.proxy !== undefined)

		const r = await trigger.call(cacheEntry.proxy as never, {
			doc: cacheEntry.proxy as never,
			before: immutabilize(withId(before, id)) as never,
			after: immutabilize(withId(after, id)) as never,
			...pathMatches,
			path: (ctx.docRef as unknown as IRef).path,
			id: id as never,
			...ctx,
			possiblyExists: cacheEntry.possiblyExists,
		})
		const data = collectTriggerResult(ctx, r)
		validateAndSetCacheEntry(ctx, data, schema?.partial)
	})

	// eslint-disable-next-line security/detect-object-injection
	return !isEqual(cacheEntry.data, cacheEntry.lastDataSeenByAfters[idx])
}

/** Start executing triggers from the beginning if data change is detected */
async function loop(c: DocRefContextWithTransaction) {
	const afterTriggers = getAfterTriggers(c.docRef)

	const MAX_ITERS = 1_000

	for (let iter = 0; ; ++iter) {
		if (iter >= MAX_ITERS) throw new TransactorError('Trigger loop')

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
 * @param ctx - Context
 * @param params - Params
 */
export async function processTriggers(
	ctx: DocRefContextWithTransaction,
	params?: Params,
) {
	const cacheEntry = getCacheEntry(ctx)

	cacheEntry.write = true
	$assert(cacheEntry.data !== undefined)

	const schema = getSchema(ctx.docRef)

	// const beforeAllTriggers = immutabilize(clone(withId(cacheEntry.data, id)))

	// apply updates
	const data = apply(ctx, cacheEntry.data, params?.updates)
	$assert(!isReplaceIt(data))
	$assert(!isDeleteIt(data))
	// console.log('apply updates', cacheEntry.data, params?.updates, data)
	validateAndSetCacheEntry(ctx, data, schema?.partial, !!params?.updates)

	if (cacheEntry.isProcessingTriggers) return

	try {
		cacheEntry.isProcessingTriggers = true
		await loop(ctx)
	} finally {
		cacheEntry.isProcessingTriggers = false
	}

	validateAndSetCacheEntry(
		ctx,
		cacheEntry.data,
		schema?.final,
		!!params?.updates,
	)
}
