// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { clone, undef } from '@voltiso/util'

import { fromFirestore } from '../../common'
import type { DataWithoutId } from '../../Data'
import { withoutId } from '../../Data'
import type { WithDb } from '../../Db'
import type { IDoc, IDocTI } from '../../Doc'
import { Doc, Doc_ } from '../../Doc'
import type { GDoc } from '../../Doc/_/GDoc.js'
import type { WithTransaction } from '../../Transaction'
import {
	isWithoutTransaction,
	isWithTransaction,
	newCacheEntry,
} from '../../Transaction'
import type { WithTransactor } from '../../Transactor'
import { initLastDataSeen } from '../../Trigger'
import { applyUpdates } from '../../updates'
import type { Forbidden } from '../../util'
import { applySchema } from '../_/applySchema.js'
import { collectTriggerResult } from '../_/collectTriggerResult.js'
import { getOnGetTriggers } from '../_/getOnGetTriggers.js'
import { getSchema } from '../_/getSchema.js'
import { validateAndSetCacheEntry } from '../_/validateAndSetCacheEntry.js'
import type { WithDocRef } from '../WithDocRef.js'

// eslint-disable-next-line etc/no-misused-generics
async function directDocPathGet<D extends IDoc>(
	ctx: WithDocRef & WithTransactor & WithDb & Forbidden<WithTransaction>,
): Promise<D | null> {
	const onGetTriggers = getOnGetTriggers.call(ctx.docRef)
	const schema = getSchema(ctx.docRef)
	const needTransaction = onGetTriggers.length > 0 || schema

	let data: DataWithoutId | null

	if (needTransaction) {
		assert(!ctx.transaction)
		data = await ctx.transactor.runTransaction(async () => {
			const doc = await ctx.db.doc(ctx.docRef.path.pathString)

			if (doc) return doc.data
			else return null
		})
	} else {
		const { _ref } = ctx.docRef
		data = fromFirestore(ctx, await _ref.get())
	}

	assert(!ctx.transaction)

	if (data) return new Doc(ctx, data) as unknown as D
	else return null
}

// eslint-disable-next-line max-statements, complexity, etc/no-misused-generics, sonarjs/cognitive-complexity
async function transactionDocPathGetImpl<D extends IDoc>(
	ctx: WithTransactor & WithDocRef & WithTransaction & WithDb,
): Promise<D | null> {
	const { _ref: ref, id } = ctx.docRef
	const { _cache, _databaseTransaction } = ctx.transaction

	const path = ctx.docRef.path.toString()

	// eslint-disable-next-line security/detect-object-injection
	if (!(path in _cache)) _cache[path] = newCacheEntry(ctx)

	// eslint-disable-next-line security/detect-object-injection
	const cacheEntry = _cache[path]
	assert(cacheEntry)

	const schema = getSchema(ctx.docRef)

	const prevData = cacheEntry.data

	if (cacheEntry.data === undef) {
		cacheEntry.data = fromFirestore(ctx, await _databaseTransaction.get(ref))

		if (cacheEntry.data?.__voltiso)
			cacheEntry.__voltiso = cacheEntry.data.__voltiso

		cacheEntry.originalData = clone(cacheEntry.data)

		// schema migration
		if (schema && cacheEntry.data) {
			const validatedData = applySchema.call(ctx, {
				schema: schema.partial,
				data: cacheEntry.data,
				bestEffort: true,
			})
			cacheEntry.data = validatedData ? withoutId(validatedData, id) : null
		}
	}

	if (cacheEntry.updates) {
		cacheEntry.data = applyUpdates(cacheEntry.data, cacheEntry.updates)

		if (cacheEntry.data?.__voltiso)
			cacheEntry.__voltiso = cacheEntry.data.__voltiso

		delete cacheEntry.updates
	}

	const schemaCheck = cacheEntry.data !== prevData

	if (schemaCheck) {
		const data = cacheEntry.data

		if (schema && data) {
			try {
				const validatedData = applySchema.call(ctx, {
					schema: schema.partial,
					data,
				})
				cacheEntry.data = validatedData ? withoutId(validatedData, id) : null

				if (cacheEntry.data?.__voltiso)
					cacheEntry.__voltiso = cacheEntry.data.__voltiso
			} catch (error) {
				throw new Error(
					`database corrupt: ${path} (${(error as Error).message})`,
				)
			}
		}
	}

	if (!cacheEntry.proxy)
		cacheEntry.proxy = cacheEntry.data ? new Doc_(ctx, cacheEntry.data) : null
	else if (cacheEntry.data) {
		assert(cacheEntry.proxy)
		cacheEntry.proxy._setRaw(cacheEntry.data)
	}

	if (cacheEntry.proxy) {
		cacheEntry.data = cacheEntry.proxy._raw

		if (cacheEntry.data.__voltiso)
			cacheEntry.__voltiso = cacheEntry.data.__voltiso
	}

	initLastDataSeen(ctx, cacheEntry)

	const onGetTriggers = getOnGetTriggers.call(ctx.docRef)

	for (const { trigger, pathMatches } of onGetTriggers) {
		// eslint-disable-next-line no-await-in-loop
		const r = await trigger.call(cacheEntry.proxy as never, {
			doc: cacheEntry.proxy as never,
			...pathMatches,
			path: ctx.docRef.path,
			id: id as never,
			...ctx,
		})

		const data = collectTriggerResult(ctx, r)
		validateAndSetCacheEntry(ctx, data, schema?.partial)
	}

	// // final schema check
	// if (schema && cacheEntry.data) {
	// 	await validateAndSetCacheEntry(ctx, cacheEntry.data, schema.final)
	// }

	return cacheEntry.proxy as D | null
}

// eslint-disable-next-line etc/no-misused-generics
export function transactionDocPathGet<D extends IDoc>(
	ctx: WithTransactor & WithDocRef & WithTransaction & WithDb,
): PromiseLike<D | null> {
	const { docRef: docPath, transaction } = ctx
	const { path } = docPath

	if (transaction._isFinalizing)
		throw new Error(
			`db('${path.toString()}').get() called after transaction body (missing await?)`,
		)

	const promise = transactionDocPathGetImpl(ctx)

	// check if there's `await` outside this function
	transaction._numFloatingPromises += 1
	return {
		// eslint-disable-next-line unicorn/no-thenable
		then(f, r) {
			transaction._numFloatingPromises -= 1

			// // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			// const currentZone = Zone?.current

			// // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			// if (currentZone) {
			// 	// eslint-disable-next-line no-param-reassign
			// 	if (f) f = currentZone.wrap(f, '@voltiso/util')
			// 	// eslint-disable-next-line no-param-reassign
			// 	if (r) r = currentZone.wrap(r, '@voltiso/util')
			// }

			// eslint-disable-next-line promise/prefer-await-to-then
			return promise.then(f as never, r)
		},
	}
}

// eslint-disable-next-line etc/no-misused-generics
export function get<TI extends IDocTI>(
	ctx: Partial<WithTransaction> & WithTransactor & WithDocRef & WithDb,
): PromiseLike<GDoc<TI, 'outside'> | null> {
	// const ctxOverride = ctx.transactor._transactionLocalStorage.getStore()
	const ctxOverride = Zone.current.get('transactionContextOverride') as
		| object
		| undefined

	// eslint-disable-next-line no-param-reassign
	if (ctxOverride) ctx = { ...ctx, ...ctxOverride }

	if (isWithTransaction(ctx))
		return transactionDocPathGet<GDoc<TI, 'outside'>>(ctx)
	else {
		assert(isWithoutTransaction(ctx))
		return directDocPathGet(ctx)
	}
}
