// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import { clone, stringFrom } from '@voltiso/util'

import { fromDatabase } from '~/common'
import { withoutId } from '~/Data'
import type { WithDb } from '~/Db'
import type { DocTI, IDoc } from '~/Doc'
import { Doc, DocImpl } from '~/Doc'
import { TransactorError } from '~/error'
import { applySchema } from '~/Ref/_/applySchema'
import { collectTriggerResult } from '~/Ref/_/collectTriggerResult'
import { getOnGetTriggers } from '~/Ref/_/getOnGetTriggers'
import { getSchema } from '~/Ref/_/getSchema'
import { validateAndSetCacheEntry } from '~/Ref/_/validateAndSetCacheEntry'
import type { WithDocRef } from '~/Ref/WithDocRef'
import type { WithTransaction } from '~/Transaction'
import {
	isWithoutTransaction,
	isWithTransaction,
	newCacheEntry,
} from '~/Transaction'
import type { WithTransactor } from '~/Transactor'
import { initLastDataSeen } from '~/Trigger'
import { applyUpdates } from '~/updates'
import type { Forbidden } from '~/util'

import type { IRef } from '..'

// eslint-disable-next-line etc/no-misused-generics
async function directDocPathGet<D extends IDoc>(
	ctx: WithDocRef & WithTransactor & WithDb & Forbidden<WithTransaction>,
): Promise<D | null> {
	const onGetTriggers = getOnGetTriggers(ctx.docRef)
	const schema = getSchema(ctx.docRef)
	const needTransaction = onGetTriggers.length > 0 || schema

	let data: object | null

	if (needTransaction) {
		$assert(!ctx.transaction)
		data = await ctx.transactor.runTransaction(async () => {
			const doc = await ctx.db.doc(ctx.docRef.path.pathString)

			if (doc) return doc.data
			else return null
		})
	} else {
		const { _ref } = ctx.docRef
		data = fromDatabase(ctx, await _ref.get())
	}

	$assert(!ctx.transaction)

	if (data) return new Doc(ctx, data as never) as unknown as D
	else return null
}

// eslint-disable-next-line etc/no-misused-generics
async function transactionDocPathGetImpl<D extends IDoc>(
	ctx: WithTransactor & WithDocRef & WithTransaction & WithDb,
): Promise<D | null> {
	// console.log('transactionDocPathGetImpl', ctx.docRef.path.toString())

	const { _ref, id } = ctx.docRef
	const { _cache, _databaseTransaction } = ctx.transaction

	const path = ctx.docRef.path.toString()

	if (!_cache.has(path)) {
		// console.log('create cacheEntry for', path)
		_cache.set(path, newCacheEntry(ctx))
	}

	const cacheEntry = _cache.get(path)
	$assert(cacheEntry)

	const schema = getSchema(ctx.docRef)

	const prevData = cacheEntry.data

	if (cacheEntry.data === undefined) {
		cacheEntry.data = fromDatabase(ctx, await _databaseTransaction.get(_ref))

		if (cacheEntry.data?.__voltiso)
			cacheEntry.__voltiso = cacheEntry.data.__voltiso

		cacheEntry.originalData = clone(cacheEntry.data)

		// console.log({cacheEntry})

		// schema migration
		if (schema && cacheEntry.data) {
			// console.log('schema val', cacheEntry.data)

			const validatedData = applySchema.call(ctx, {
				schema: schema.partial,
				data: cacheEntry.data,
				bestEffort: true,
			})
			cacheEntry.data = validatedData ? withoutId(validatedData, id) : null
			// console.log('schema val after', cacheEntry.data)
		}
	}

	if (cacheEntry.updates) {
		cacheEntry.data = applyUpdates(cacheEntry.data, cacheEntry.updates)

		if (cacheEntry.data?.__voltiso)
			cacheEntry.__voltiso = cacheEntry.data.__voltiso

		delete cacheEntry.updates
	}

	const schemaCheck = cacheEntry.data !== prevData

	// console.log('schemaCheck', schemaCheck)

	if (schemaCheck && schema && cacheEntry.data) {
		try {
			// console.log('applySchema partial', cacheEntry.data)

			const validatedData = applySchema.call(ctx, {
				schema: schema.partial,
				data: cacheEntry.data,
				bestEffort: true,
			})
			cacheEntry.data = validatedData ? withoutId(validatedData, id) : null

			if (cacheEntry.data?.__voltiso)
				cacheEntry.__voltiso = cacheEntry.data.__voltiso

			// console.log('applySchema partial after', cacheEntry.data)
		} catch (error) {
			throw new TransactorError(
				`database corrupt: ${path} (${(error as Error).message})`,
			)
		}
	}

	if (!cacheEntry.proxy)
		cacheEntry.proxy = cacheEntry.data
			? new DocImpl(ctx, cacheEntry.data)
			: null
	else if (cacheEntry.data) {
		$assert(cacheEntry.proxy)
		cacheEntry.proxy._setRaw(cacheEntry.data)
	}

	if (cacheEntry.proxy) {
		cacheEntry.data = cacheEntry.proxy._raw

		// $assert(cacheEntry.data.__voltiso)

		if (cacheEntry.data.__voltiso)
			cacheEntry.__voltiso = cacheEntry.data.__voltiso
	}

	initLastDataSeen(ctx, cacheEntry)

	const onGetTriggers = getOnGetTriggers(ctx.docRef)

	for (const { trigger, pathMatches } of onGetTriggers) {
		// eslint-disable-next-line no-await-in-loop
		const r = await trigger.call(cacheEntry.proxy as never, {
			doc: cacheEntry.proxy as never,
			...pathMatches,
			path: (ctx.docRef as unknown as IRef).path,
			id: id as never,
			...ctx,
			possiblyExists: cacheEntry.possiblyExists,
		})

		const data = collectTriggerResult(ctx, r)
		validateAndSetCacheEntry(ctx, data, schema?.partial)
	}

	// do not enforce strict constraints yet? (custom triggers may enforce constraints)

	// final schema check
	if (schema && cacheEntry.data) {
		validateAndSetCacheEntry(ctx, cacheEntry.data, schema.partial)
	}

	return cacheEntry.proxy as D | null
}

// eslint-disable-next-line etc/no-misused-generics
export function transactionDocPathGet<D extends IDoc>(
	ctx: WithTransactor & WithDocRef & WithTransaction & WithDb,
): PromiseLike<D | null> {
	const { docRef, transaction } = ctx
	const { path } = docRef

	if (transaction._isFinalizing)
		throw new TransactorError(
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
export function get<TI extends DocTI>(
	ctx: Partial<WithTransaction> & WithTransactor & WithDocRef & WithDb,
): PromiseLike<Doc<TI, 'outside'> | null> {
	// const ctxOverride = ctx.transactor._transactionLocalStorage.getStore()
	const ctxOverride = Zone.current.get('transactionContextOverride') as
		| object
		| undefined

	// eslint-disable-next-line no-param-reassign
	if (ctxOverride) ctx = { ...ctx, ...ctxOverride }

	if (isWithTransaction(ctx)) {
		if (ctx.transaction._error)
			throw new TransactorError(
				`Do not catch errors inside transactions - this transaction is supposed to fail. Caught error: ${stringFrom(
					ctx.transaction._error,
				)}`,
			)

		return transactionDocPathGet<Doc<TI, 'outside'>>(ctx)
	} else {
		$assert(isWithoutTransaction(ctx))
		return directDocPathGet(ctx)
	}
}
