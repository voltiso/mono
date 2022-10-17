// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert, isDefined, stringFrom } from '@voltiso/util'

import { databaseUpdate } from '~/common'
import { withoutId, withVoltisoEntry } from '~/Data'
import type { WithDb } from '~/Db'
import type { DocLike, IDoc } from '~/Doc/IDoc'
import { IndexedDoc } from '~/Doc/IndexedDoc'
import type { WithDocRef } from '~/DocRef'
import {
	getAfterTriggers,
	getBeforeCommits,
	getSchema,
	processTriggers,
} from '~/DocRef'
import { TransactorError } from '~/error'
import type { DeleteIt, RootReplaceIt } from '~/it'
import { isDeleteIt, isReplaceIt, ReplaceIt } from '~/it'
import type { WithTransaction } from '~/Transaction'
import {
	isWithoutTransaction,
	isWithTransaction,
	newCacheEntry,
	setCacheEntry,
} from '~/Transaction'
import type { WithTransactor } from '~/Transactor'
import type { Updates, UpdatesRecord } from '~/updates/Updates'
import {
	applyUpdates,
	combineUpdates,
	dataFromUpdates,
} from '~/updates/Updates'
import type { Forbidden } from '~/util'

import { transactionDocPathGet } from './get'

type Ctx = WithTransactor & Partial<WithTransaction> & WithDocRef & WithDb
type CtxWithTransaction = Ctx & WithTransaction
type CtxWithoutTransaction = WithTransactor &
	WithDocRef &
	Forbidden<WithTransaction> &
	WithDb

type StripParams = {
	onConstField: 'error' | 'ignore'
	onPrivateField: 'error' | 'ignore'
}

function isRecord(updates: Updates): updates is UpdatesRecord {
	return updates.constructor === Object
}

function check(this: WithDocRef, updates: Updates, params?: StripParams) {
	if (updates instanceof ReplaceIt) {
		check.call(this, updates.data, params)
		return
	}

	if (!isRecord(updates)) return

	const { docRef } = this
	const path = docRef.path.toString()

	const { onConstField, onPrivateField } = params || {}

	if (onConstField === 'error') {
		getSchema(docRef)
		for (const key in docRef._publicOnCreationSchema) {
			if (key in updates)
				throw new TransactorError(
					`cannot modify const field '${path}.${key}' from outside`,
				)
		}
	}

	if (onPrivateField === 'error') {
		getSchema(docRef)
		for (const key in docRef._privateSchema) {
			if (key in updates) {
				throw new TransactorError(
					`cannot modify private field '${path}.${key}' from outside`,
				)
			}
		}
	}
}

async function rawUpdate(
	ctx: CtxWithoutTransaction,
	updates: UpdatesRecord,
): Promise<IndexedDoc | undefined>

async function rawUpdate(
	ctx: CtxWithoutTransaction,
	updates: RootReplaceIt,
): Promise<IndexedDoc>

async function rawUpdate(
	ctx: CtxWithoutTransaction,
	updates: DeleteIt,
): Promise<null>

async function rawUpdate(
	ctx: CtxWithoutTransaction,
	updates: Updates,
): Promise<IndexedDoc | null | undefined>

//

async function rawUpdate(
	ctx: CtxWithoutTransaction,
	updates: Updates,
): Promise<IndexedDoc | null | undefined> {
	assert(updates)
	check.call(ctx, updates)

	const afterTriggers = getAfterTriggers(ctx.docRef)
	const beforeCommits = getBeforeCommits(ctx.docRef)
	const schema = getSchema(ctx.docRef)

	const { _ref } = ctx.docRef
	const path = ctx.docRef.path.toString()

	let data: object | null | undefined // undefined -> unknown; null -> deleted

	const needTransaction = Boolean(
		schema ||
			afterTriggers.length > 0 ||
			beforeCommits.length > 0 ||
			ctx.transactor.refCounters,
	)

	if (needTransaction) {
		data = await ctx.transactor.runTransaction(async () => {
			const doc = await ctx.db.doc(path).update(updates as never)
			return doc ? (doc.dataWithId() as never) : null
		})
	} else {
		assert(ctx.transactor._databaseContext)
		data = await databaseUpdate(
			ctx.transactor,
			ctx.transactor._databaseContext,
			ctx.transactor._database,
			_ref,
			updates,
		)
	}

	if (!data) return data
	else {
		// eslint-disable-next-line unicorn/consistent-destructuring
		const dataWithoutId = withoutId(data, ctx.docRef.id)
		const finalData = withVoltisoEntry(dataWithoutId)
		return new IndexedDoc(ctx, finalData) as never
	}
}

async function transactionUpdateImpl(
	ctx: CtxWithTransaction,
	updates: UpdatesRecord,
	options: Partial<StripParams>,
): Promise<IndexedDoc | undefined>

async function transactionUpdateImpl(
	ctx: CtxWithTransaction,
	updates: RootReplaceIt,
	options: Partial<StripParams>,
): Promise<IndexedDoc>

async function transactionUpdateImpl(
	ctx: CtxWithTransaction,
	updates: DeleteIt,
	options: Partial<StripParams>,
): Promise<null>

async function transactionUpdateImpl(
	ctx: CtxWithTransaction,
	updates: Updates,
	options: Partial<StripParams>,
): Promise<IndexedDoc | null | undefined>

async function transactionUpdateImpl(
	ctx: CtxWithTransaction,
	updates: Updates,
	{
		onConstField = 'error',
		onPrivateField = 'error',
	}: Partial<StripParams> = {},
): Promise<DocLike | null | undefined> {
	if (ctx.transactor._options.log) {
		// eslint-disable-next-line no-console
		console.log(
			`transactionUpdateImpl(${ctx.docRef.path.toString()}, ${stringFrom(
				updates,
			)})`,
		)
	}

	// returns undefined if unknown (usually update performed on a document without a trigger or schema)
	assert(updates)

	const afterTriggers = getAfterTriggers(ctx.docRef)
	const beforeCommits = getBeforeCommits(ctx.docRef)

	const schema = getSchema(ctx.docRef)

	const path = ctx.docRef.path.toString()
	const { _cache, _execContext } = ctx.transaction

	if (_execContext?.pathString === ctx.docRef.path.pathString)
		// eslint-disable-next-line no-param-reassign
		onPrivateField = 'ignore'

	if (!_cache.has(path)) _cache.set(path, newCacheEntry(ctx))

	const cacheEntry = _cache.get(path)
	assert(cacheEntry)
	cacheEntry.write = true

	const needReadWrite = Boolean(
		beforeCommits.length > 0 ||
			afterTriggers.length > 0 ||
			schema ||
			ctx.transactor.refCounters,
	)

	if (needReadWrite) {
		await transactionDocPathGet(ctx)

		if (cacheEntry.data)
			check.call(ctx, updates, {
				onConstField,
				onPrivateField,
			})
		else
			check.call(ctx, updates, {
				onConstField: 'ignore',
				onPrivateField,
			})

		await processTriggers(ctx, { updates })
	} else {
		check.call(ctx, updates)

		let { data } = cacheEntry

		if (isDefined(data)) {
			data = applyUpdates(data, updates)
		} else if (isDefined(cacheEntry.updates)) {
			cacheEntry.updates = combineUpdates(cacheEntry.updates, updates)
		} else {
			cacheEntry.updates = updates
		}

		if (isReplaceIt(cacheEntry.updates) || isDeleteIt(cacheEntry.updates)) {
			assert(data === undefined)
			data = dataFromUpdates(cacheEntry.updates)
			delete cacheEntry.updates
		}

		if (isDefined(data)) setCacheEntry(ctx, cacheEntry, data)
	}

	return cacheEntry.proxy as never
}

function transactionUpdate(
	this: WithTransactor & WithDocRef & WithTransaction & WithDb,
	updates: Updates,
	options: Partial<StripParams> = {},
): PromiseLike<IDoc | null | undefined> {
	assert(updates)
	const { transaction, docRef } = this

	if (transaction._isFinalizing)
		throw new TransactorError(
			`db('${docRef.path.toString()}').update() called after transaction body (missing await?)`,
		)

	const promise = transactionUpdateImpl(this, updates, options)

	// const currentZone = Zone.current

	// check if there's `await` outside this function
	transaction._numFloatingPromises += 1
	return {
		// eslint-disable-next-line unicorn/no-thenable
		then(f, r) {
			transaction._numFloatingPromises -= 1

			// if (onfulfilled) onfulfilled = currentZone.wrap(onfulfilled, 'transactionUpdate')
			// if (onrejected) onrejected = currentZone.wrap(onrejected, 'transactionUpdate')

			// eslint-disable-next-line promise/prefer-await-to-then
			return promise.then(f as never, r)
		},
	}
}

export function update(
	ctx: Ctx,
	updates: UpdatesRecord,
): PromiseLike<IDoc | undefined>
export function update(ctx: Ctx, updates: RootReplaceIt): PromiseLike<IDoc>
export function update(ctx: Ctx, updates: DeleteIt): PromiseLike<null>
export function update(
	ctx: Ctx,
	updates: Updates,
): PromiseLike<IDoc | null | undefined>

export function update(
	ctx: Ctx,
	updates: Updates,
): PromiseLike<IDoc | null | undefined> {
	assert(updates)

	// const ctxOverride = ctx.transactor._transactionLocalStorage.getStore()
	const ctxOverride = Zone.current.get('transactionContextOverride') as
		| object
		| null

	// eslint-disable-next-line no-param-reassign
	if (ctxOverride) ctx = { ...ctx, ...ctxOverride }

	if (isWithTransaction(ctx)) {
		if (ctx.transaction._error)
			throw new TransactorError(
				`Do not catch errors inside transactions - this transaction is supposed to fail. Caught error: ${stringFrom(
					ctx.transaction._error,
				)}`,
			)

		return transactionUpdate.call(ctx, updates)
	} else {
		assert(isWithoutTransaction(ctx))
		return rawUpdate(ctx, updates) as never
	}
}
