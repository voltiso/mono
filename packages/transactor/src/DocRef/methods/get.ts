// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type { Schema } from '@voltiso/schemar'
import {
	$AssumeType,
	assertNotPolluting,
	patch,
	stringFrom,
} from '@voltiso/util'
import { deepCloneData } from '@voltiso/util.firestore'

import { fromDatabase } from '~/common'
import { withVoltisoEntry } from '~/Data'
import type { WithDb } from '~/Db'
import type { $$Doc, DocTI } from '~/Doc'
import { Doc, DocImpl } from '~/Doc'
import { TransactorError } from '~/error'
import type { VoltisoEntry } from '~/schemas'
import {
	getDefaultVoltisoEntry,
	sVoltisoEntry,
	sVoltisoEntryAggregateTargetEntry,
} from '~/schemas'
import type { WithTransaction } from '~/Transaction'
import {
	isWithoutTransaction,
	isWithTransaction,
	newCacheEntry,
} from '~/Transaction'
import type { WithTransactor } from '~/Transactor'
import { initLastDataSeen } from '~/Trigger'
import type { Forbidden } from '~/util'
import { guardedValidate_ } from '~/util'

import {
	applySchema,
	collectTriggerResult,
	getAggregateSchemas,
	getOnGetTriggers,
	getSchema,
	validateAndSetCacheEntry,
} from '../_'
import type { WithDocRef } from '../WithDocRef'

function getIsTransactionNeededForRead(
	ctx: WithDocRef & WithTransactor & WithDb & Forbidden<WithTransaction>,
): boolean {
	const onGetTriggers = getOnGetTriggers(ctx.docRef)
	if (onGetTriggers.length > 0) return true

	// ! not needed - after triggers only react to changes - initiated by updates or schema transforms (fixes)
	// const afterTriggers = getAfterTriggers(ctx.docRef)
	// if(afterTriggers.length > 0) return true

	const schema = getSchema(ctx.docRef)
	if (schema) return true

	const aggregateSchemas = getAggregateSchemas(ctx.docRef)
	if (Object.keys(aggregateSchemas).length > 0) return true

	return false
}

async function directDocPathGet<D extends $$Doc>(
	ctx: WithDocRef & WithTransactor & WithDb & Forbidden<WithTransaction>,
): Promise<D | null> {
	const needTransaction = getIsTransactionNeededForRead(ctx)

	let data: object | null

	if (needTransaction) {
		assert.not(ctx.transaction)
		data = await ctx.transactor.runTransaction(async () => {
			const doc = await ctx.db.doc(ctx.docRef.path.toString())

			if (doc) return doc.data
			else return null
		})
	} else {
		const { _ref } = ctx.docRef
		data = fromDatabase(ctx, await _ref.get())
		if (data) data = withVoltisoEntry(ctx, data)
	}

	assert(!ctx.transaction)

	if (data) return new Doc(ctx, data as never) as unknown as D
	else return null
}

async function transactionDocPathGetImpl<D extends $$Doc>(
	ctx: WithTransactor & WithDocRef & WithTransaction & WithDb,
): Promise<D | null> {
	const { _ref, id } = ctx.docRef
	const { _cache, _databaseTransaction, _date } = ctx.transaction

	const path = ctx.docRef.path.toString()

	if (!_cache.has(path)) {
		// console.log('create cacheEntry for', path)
		_cache.set(path, newCacheEntry(ctx))
	}

	const cacheEntry = _cache.get(path)
	assert(cacheEntry)

	const schema = getSchema(ctx.docRef)
	const aggregateSchemas = getAggregateSchemas(ctx.docRef)
	const haveAggregateSchemas = Object.keys(aggregateSchemas).length > 0

	const prevData = cacheEntry.data

	if (cacheEntry.data === undefined) {
		const snapshot = await _databaseTransaction.get(_ref)

		cacheEntry.data = fromDatabase(ctx, snapshot)
		if (cacheEntry.data)
			cacheEntry.data = withVoltisoEntry(ctx, cacheEntry.data)

		if (cacheEntry.data?.__voltiso)
			cacheEntry.__voltiso = cacheEntry.data.__voltiso

		cacheEntry.__voltiso ||= getDefaultVoltisoEntry(ctx, _date) // ! triggers may not see mutations done here

		cacheEntry.originalData = deepCloneData(cacheEntry.data) // ! ground truth for after-triggers (the first `before` value)

		// console.log({cacheEntry})

		// console.log({ aggregateSchemas, __voltiso: cacheEntry.__voltiso })

		assert(cacheEntry.__voltiso)
		// init aggregate defaults
		if (haveAggregateSchemas) {
			// read from `.__voltiso` - data may be `null`
			for (const [name, schema] of Object.entries(aggregateSchemas)) {
				assertNotPolluting(name)

				let entry: VoltisoEntry.AggregateTarget.Entry | undefined =
					cacheEntry.__voltiso.aggregateTarget[name]

				entry = guardedValidate_(
					ctx,
					sVoltisoEntryAggregateTargetEntry.default({}),
					entry,
				) as typeof entry

				assert(entry)

				$AssumeType<Schema>(schema)

				entry.value = guardedValidate_(ctx, schema, entry.value) as never

				if (entry.value === undefined) delete entry.value

				// console.log('SET INITIAL AGGREGATE', name, entry)

				cacheEntry.__voltiso.aggregateTarget[name] = entry
			}
		}

		// console.log('AND...', { __voltiso: cacheEntry.__voltiso })

		// schema migration
		if (schema && cacheEntry.data) {
			// console.log('schema val', cacheEntry.data)

			const validatedData = applySchema(ctx, {
				schema,
				data: cacheEntry.data,
				bestEffort: true,
			})

			cacheEntry.data = validatedData
			// cacheEntry.data = validatedData ? withoutId(validatedData, id) : null
		}
	}

	// console.log('orig', cacheEntry.originalData)
	assert(cacheEntry.originalData !== undefined)
	initLastDataSeen(ctx, cacheEntry)

	if (cacheEntry.updates) {
		cacheEntry.data = patch(
			cacheEntry.data,
			cacheEntry.updates as never,
		) as typeof cacheEntry.data

		if (cacheEntry.data?.__voltiso)
			cacheEntry.__voltiso = cacheEntry.data.__voltiso

		delete cacheEntry.updates
	}

	const schemaCheck = cacheEntry.data !== prevData

	// console.log('schemaCheck', schemaCheck)

	if (schemaCheck && schema && cacheEntry.data) {
		try {
			// console.log('applySchema partial', cacheEntry.data)

			const validatedData = applySchema(ctx, {
				schema,
				data: cacheEntry.data,
				bestEffort: true,
			})

			cacheEntry.data = validatedData
			// cacheEntry.data = validatedData ? withoutId(validatedData, id) : null

			if (cacheEntry.data)
				cacheEntry.data.__voltiso = sVoltisoEntry.validate(
					cacheEntry.data.__voltiso,
				)

			assert(cacheEntry.data?.__voltiso)

			// if (cacheEntry.data?.__voltiso)
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
		assert(cacheEntry.proxy)
		cacheEntry.proxy._setRaw(cacheEntry.data)
	}

	if (cacheEntry.proxy) {
		cacheEntry.data = cacheEntry.proxy._raw

		// $assert(cacheEntry.data.__voltiso)
		cacheEntry.data.__voltiso ||= getDefaultVoltisoEntry(ctx, _date)

		// if (cacheEntry.data.__voltiso)
		cacheEntry.__voltiso = cacheEntry.data.__voltiso
	}

	cacheEntry.__voltiso ||= getDefaultVoltisoEntry(ctx, _date)

	const onGetTriggers = getOnGetTriggers(ctx.docRef)

	for (const { trigger, pathMatches } of onGetTriggers) {
		// assert(cacheEntry.__voltiso)

		// eslint-disable-next-line no-await-in-loop
		const r = await trigger.call(cacheEntry.proxy as never, {
			doc: cacheEntry.proxy as never,
			__voltiso: cacheEntry.__voltiso as never,
			...pathMatches,
			path: ctx.docRef.path as never,
			id: id as never,
			...ctx,
			possiblyExists: cacheEntry.possiblyExists,
		})

		const data = collectTriggerResult(ctx, r)
		validateAndSetCacheEntry(ctx, {
			data,
			schema,
			bestEffort: true,
		})
	}

	// do not enforce strict constraints yet? (custom triggers may enforce constraints)

	// final schema check
	if (schema && cacheEntry.data) {
		validateAndSetCacheEntry(ctx, {
			data: cacheEntry.data,
			schema,
			bestEffort: false,
		})
	}

	return cacheEntry.proxy as D | null
}

export function transactionDocPathGet<D extends $$Doc>(
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

			// eslint-disable-next-line promise/prefer-await-to-then
			return promise.then(f as never, r)
		},
	}
}

export function get<TI extends DocTI>(
	ctx: Partial<WithTransaction> & WithTransactor & WithDocRef & WithDb,
): PromiseLike<Doc<TI> | null> {
	const ctxOverride = ctx.transactor._transactionContext.tryGetValue

	// eslint-disable-next-line no-param-reassign
	if (ctxOverride) ctx = { ...ctx, ...ctxOverride }

	if (isWithTransaction(ctx)) {
		if (ctx.transaction._error)
			throw new TransactorError(
				`Do not catch errors inside transactions - this transaction is supposed to fail. Caught error: ${stringFrom(
					ctx.transaction._error,
				)}`,
			)

		return transactionDocPathGet<Doc<TI>>(ctx)
	} else {
		assert(isWithoutTransaction(ctx))
		return directDocPathGet(ctx) as never
	}
}
