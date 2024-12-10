// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable sonarjs/nested-control-flow */

import { assert } from '@voltiso/assertor'
import type { DocumentSnapshot } from '@voltiso/firestore-like'
import type { Schema } from '@voltiso/schemar'
import type { nullish } from '@voltiso/util'
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
import { _checkDecorators } from '~/decorators'
import type { $$Doc, DocTI } from '~/Doc'
import { Doc, DocImpl } from '~/Doc'
import { TransactorError } from '~/error'
import type { IntrinsicFields, VoltisoEntry } from '~/schemas'
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
	_ctx: WithDocRef & WithTransactor & WithDb & Forbidden<WithTransaction>,
): boolean {
	// ! currently since version 21 we don't start transactions automatically

	// const onGetTriggers = getOnGetTriggers(ctx.docRef)
	// if (onGetTriggers.length > 0) return true

	// ! not needed - after triggers only react to changes - initiated by updates or schema transforms (fixes) - this was disabled way before version 21
	// const afterTriggers = getAfterTriggers(ctx.docRef)
	// if(afterTriggers.length > 0) return true

	// const schema = getSchema(ctx.docRef)
	// if (schema) return true

	// const aggregateSchemas = getAggregateSchemas(ctx.docRef)
	// if (Object.keys(aggregateSchemas).length > 0) return true

	return false
}

function transformDataPreGroundTruth(
	ctx: WithDocRef & WithTransactor & WithDb,
	rawData: DocumentSnapshot,
): IntrinsicFields | null {
	let data = fromDatabase(ctx, rawData)
	if (data) data = withVoltisoEntry(ctx, data)
	return data
}

function applyAggregateSchemaDefaults(
	ctx: WithDocRef & WithTransactor,
	voltisoEntry: VoltisoEntry | nullish,
) {
	if (!voltisoEntry) return

	const aggregateSchemas = getAggregateSchemas(ctx.docRef)
	const haveAggregateSchemas = Object.keys(aggregateSchemas).length > 0

	// init aggregate defaults
	if (haveAggregateSchemas) {
		// read from `.__voltiso` - data may be `null`
		for (const [name, schema] of Object.entries(aggregateSchemas)) {
			assertNotPolluting(name)

			let entry: VoltisoEntry.AggregateTarget.Entry | undefined =
				voltisoEntry.aggregateTarget[name]

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
			voltisoEntry.aggregateTarget[name] = entry
		}
	}
}

// todo: there's some duplicated logic in directDocPathGet and transactionDocPathGetImpl

async function directDocPathGet<D extends $$Doc>(
	ctx: WithDocRef & WithTransactor & WithDb & Forbidden<WithTransaction>,
): Promise<D | null> {
	_checkDecorators(ctx)
	const needTransaction = getIsTransactionNeededForRead(ctx)

	if (needTransaction) {
		// ! never
		assert.not(ctx.transaction)
		const data = await ctx.transactor.runTransaction(async () => {
			const doc = await ctx.db.doc(ctx.docRef.path.toString())

			if (doc) return doc.data
			else return null
		})

		if (data) return new Doc(ctx, data as never) as unknown as D
		else return null
	} else {
		const { _ref, id, path } = ctx.docRef
		const rawData = await _ref.get()

		let data = transformDataPreGroundTruth(ctx, rawData)
		applyAggregateSchemaDefaults(ctx, data?.__voltiso)

		const schema = getSchema(ctx.docRef)
		if (schema && data) {
			try {
				const validatedData = applySchema(ctx, {
					schema,
					data,
					bestEffort: true,
				})
				assert.defined(validatedData) // ?
				data = validatedData

				assert(data?.__voltiso)
				data.__voltiso = sVoltisoEntry.validate(data.__voltiso)
				assert(data.__voltiso)
			} catch (error) {
				const pathString = path.toString()
				const outerError = new TransactorError(
					`database corrupt: ${pathString} (${(error as Error).message})`,
				)
				outerError.cause = error
				throw outerError
			}
		}

		const onGetTriggers = getOnGetTriggers(ctx.docRef)

		if (onGetTriggers.length > 0) {
			await ctx.transactor._isInsideOnGetNoTransaction.run(true, async () => {
				for (const { trigger, pathMatches } of onGetTriggers) {
					const doc = data ? new Doc(ctx, data as never) : null
					// assert(cacheEntry.__voltiso)

					// eslint-disable-next-line no-await-in-loop
					const r = await trigger.call(doc, {
						doc,

						__voltiso:
							data?.__voltiso || getDefaultVoltisoEntry(ctx, new Date()),

						...pathMatches,
						path,
						id,
						...ctx,
						possiblyExists: ctx.transactor._options.partial,
					})

					{
						const newData = collectTriggerResult(ctx, r)
						// eslint-disable-next-line require-atomic-updates, unicorn/no-negated-condition
						if (newData !== undefined) data = newData as never
						// eslint-disable-next-line require-atomic-updates
						else data = doc?.data ?? null
					}

					if (data && schema) {
						data = applySchema(ctx, {
							data,
							schema,
							bestEffort: true,
						}) as never
					}

					if (data) data = withVoltisoEntry(ctx, data)
				}
			})
		}

		// console.log('FINAL SCHEMA CHECK', data)

		// final schema check
		if (schema && data) {
			try {
				const validatedData = applySchema(ctx, {
					schema,
					data,
					bestEffort: false,
				})
				assert.defined(validatedData) // ?
				data = validatedData

				assert(data?.__voltiso)
				data.__voltiso = sVoltisoEntry.validate(data.__voltiso)
				assert(data.__voltiso)
			} catch (error) {
				const pathString = path.toString()
				const outerError = new TransactorError(
					`database corrupt: ${pathString} (${(error as Error).message})`,
				)
				outerError.cause = error
				throw outerError
			}
		}

		return data ? (new Doc(ctx, data as never) as unknown as D) : null
	}
}

// eslint-disable-next-line sonarjs/cyclomatic-complexity
async function transactionDocPathGetImpl<D extends $$Doc>(
	ctx: WithTransactor & WithDocRef & WithTransaction & WithDb,
): Promise<D | null> {
	_checkDecorators(ctx)
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

	const prevData = cacheEntry.data

	if (cacheEntry.data === undefined) {
		const snapshot = await _databaseTransaction.get(_ref)

		cacheEntry.data = transformDataPreGroundTruth(ctx, snapshot)

		if (cacheEntry.data?.__voltiso)
			cacheEntry.__voltiso = cacheEntry.data.__voltiso

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		cacheEntry.__voltiso ||= getDefaultVoltisoEntry(ctx, _date) // ! triggers may not see mutations done here

		cacheEntry.originalData = deepCloneData(cacheEntry.data) // ! ground truth for after-triggers (the first `before` value)

		// console.log({cacheEntry})

		// console.log({ aggregateSchemas, __voltiso: cacheEntry.__voltiso })

		assert(cacheEntry.__voltiso)

		applyAggregateSchemaDefaults(ctx, cacheEntry.__voltiso) // updates both cacheEntry.__voltiso and cacheEntry.data.__voltiso

		// schema migration
		if (schema && cacheEntry.data) {
			const validatedData = applySchema(ctx, {
				schema,
				data: cacheEntry.data,
				bestEffort: true,
			})
			cacheEntry.data = validatedData
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

			if (cacheEntry.data)
				cacheEntry.data.__voltiso = sVoltisoEntry.validate(
					cacheEntry.data.__voltiso,
				)

			assert(cacheEntry.data?.__voltiso)

			cacheEntry.__voltiso = cacheEntry.data.__voltiso

			// console.log('applySchema partial after', cacheEntry.data)
		} catch (error) {
			const outerError = new TransactorError(
				`database corrupt: ${path} (${(error as Error).message})`,
			)
			outerError.cause = error
			throw outerError
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
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		cacheEntry.data.__voltiso ||= getDefaultVoltisoEntry(ctx, _date)

		// if (cacheEntry.data.__voltiso)
		cacheEntry.__voltiso = cacheEntry.data.__voltiso
	}

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
		assert.defined(data)
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

			// eslint-disable-next-line promise/prefer-await-to-then, @typescript-eslint/use-unknown-in-catch-callback-variable
			return promise.then(f as never, r)
		},
	}
}

export function get<TI extends DocTI>(
	ctx: Partial<WithTransaction> & WithTransactor & WithDocRef & WithDb,
): PromiseLike<Doc<TI> | null> {
	const ctxOverride = ctx.transactor._getTransactionContext()

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
