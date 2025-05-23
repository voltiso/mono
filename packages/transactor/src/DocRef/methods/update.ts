// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeleteIt } from '@voltiso/util'
import {
	$AssumeType,
	fastAssert,
	isDefined,
	isDeleteIt,
	isReplaceIt,
	omit,
	replaceIt,
	stringFrom,
} from '@voltiso/util'

import { databaseUpdate } from '~/common'
import { withoutId, withVoltisoEntry } from '~/Data'
import type { WithDb } from '~/Db'
import { _checkDecorators } from '~/decorators'
import type { $$Doc, Doc } from '~/Doc'
import { IndexedDoc } from '~/Doc'
import type { WithDocRef } from '~/DocRef'
import {
	applyUpdates,
	combineUpdates,
	getAfterTriggers,
	getBeforeCommits,
	getSchema,
	processTriggers,
} from '~/DocRef'
import { TransactorError } from '~/error'
import type { RootReplaceIt } from '~/it'
import type { WithTransaction } from '~/Transaction'
import {
	isWithoutTransaction,
	isWithTransaction,
	newCacheEntry,
	setCacheEntry,
} from '~/Transaction'
import type { WithTransactor } from '~/Transactor'
import type { Updates, UpdatesRecord } from '~/updates/Updates'
import type { Forbidden } from '~/util'

import { transactionDocPathGet } from './get'

type Ctx = WithTransactor & Partial<WithTransaction> & WithDocRef & WithDb
type CtxWithTransaction = Ctx & WithTransaction
type CtxWithoutTransaction = WithTransactor &
	WithDocRef &
	Forbidden<WithTransaction> &
	WithDb

export interface StripParams {
	onConstField: 'error' | 'ignore'
	onPrivateField: 'error' | 'ignore'
}

export interface UpdateOptions extends StripParams {
	create: boolean
}

function isRecord(updates: Updates): updates is UpdatesRecord {
	return updates.constructor === Object
}

// eslint-disable-next-line sonarjs/cyclomatic-complexity
function check<T extends Updates>(
	ctx: WithDocRef,
	updates: T,
	params?: StripParams,
): T {
	if (isReplaceIt(updates)) {
		// eslint-disable-next-line no-param-reassign
		updates = check(ctx, updates.__replaceIt as never, params)
		return replaceIt(updates) as never
	}

	if (!isRecord(updates)) return updates

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	if ((updates as any)?.__voltiso) {
		// eslint-disable-next-line no-param-reassign
		updates = omit(updates as never, '__voltiso')
	}

	const { docRef } = ctx
	const path = docRef.path.toString()

	const { onConstField, onPrivateField } = params || {}

	if (onConstField === 'error') {
		getSchema(docRef)
		for (const key in docRef._publicOnCreationSchema?.getShape) {
			if (key in updates)
				throw new TransactorError(
					`cannot modify const field '${path}.${key}' from outside`,
				)
		}
	}

	if (onPrivateField === 'error') {
		getSchema(docRef)
		for (const key in docRef._privateSchema?.getShape) {
			if (key in updates) {
				throw new TransactorError(
					`cannot modify private field '${path}.${key}' from outside`,
				)
			}
		}
	}

	return updates
}

async function rawUpdate(
	ctx: CtxWithoutTransaction,
	updates: UpdatesRecord,
	options: Partial<UpdateOptions>,
): Promise<IndexedDoc | undefined>

async function rawUpdate(
	ctx: CtxWithoutTransaction,
	updates: RootReplaceIt,
	options: Partial<UpdateOptions>,
): Promise<IndexedDoc>

async function rawUpdate(
	ctx: CtxWithoutTransaction,
	updates: DeleteIt,
	options: Partial<UpdateOptions>,
): Promise<null>

async function rawUpdate(
	ctx: CtxWithoutTransaction,
	updates: Updates,
	options: Partial<UpdateOptions>,
): Promise<IndexedDoc | null | undefined>

//

async function rawUpdate(
	ctx: CtxWithoutTransaction,
	updates: Updates,
	options: Partial<UpdateOptions>,
): Promise<IndexedDoc | null | undefined> {
	_checkDecorators(ctx)
	fastAssert(updates)
	// eslint-disable-next-line no-param-reassign
	updates = check(ctx, updates)

	const afterTriggers = getAfterTriggers(ctx.docRef)
	const beforeCommits = getBeforeCommits(ctx.docRef)
	const schema = getSchema(ctx.docRef)

	const { _ref } = ctx.docRef

	let data: object | null | undefined // undefined -> unknown; null -> deleted

	const needTransaction = Boolean(
		// eslint-disable-next-line sonarjs/expression-complexity
		options.create ||
			schema ||
			afterTriggers.length > 0 ||
			beforeCommits.length > 0 ||
			ctx.transactor.refCounters,
	)

	if (needTransaction) {
		data = await ctx.transactor.runTransaction(async () => {
			const doc = await update(ctx, updates, options)
			$AssumeType<Doc | null | undefined, $$Doc | null | undefined>(doc)
			return doc ? (doc.dataWithId() as never) : null
		})
	} else {
		fastAssert(ctx.transactor._databaseContext)
		data = await databaseUpdate(
			ctx.transactor,
			ctx.transactor._databaseContext,
			ctx.transactor._database,
			_ref,
			updates,
		)
	}

	if (!data) return data

	// eslint-disable-next-line unicorn/consistent-destructuring
	const dataWithoutId = withoutId(data, ctx.docRef.id)
	const finalData = withVoltisoEntry(ctx, dataWithoutId)
	return new IndexedDoc(ctx, finalData as never) as never
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

// eslint-disable-next-line sonarjs/cyclomatic-complexity
async function transactionUpdateImpl(
	ctx: CtxWithTransaction,
	updates: Updates,
	partialOptions: Partial<UpdateOptions>,
): Promise<$$Doc | null | undefined> {
	_checkDecorators(ctx)
	const defaultOptions = {
		onConstField: 'error' as const,
		onPrivateField: 'error' as const,
	}
	const options = { ...defaultOptions, ...partialOptions }

	if (ctx.transactor._options.log) {
		// eslint-disable-next-line no-console
		console.log(
			`transactionUpdateImpl(${ctx.docRef.path.toString()}, ${stringFrom(
				updates,
			)})`,
		)
	}

	// returns undefined if unknown (usually update performed on a document without a trigger or schema)
	fastAssert(updates)

	const afterTriggers = getAfterTriggers(ctx.docRef)
	const beforeCommits = getBeforeCommits(ctx.docRef)

	const schema = getSchema(ctx.docRef)

	const path = ctx.docRef.path.toString()
	const { _cache, _execContext } = ctx.transaction

	if (_execContext?.toString() === ctx.docRef.path.toString())
		options.onPrivateField = 'ignore'

	if (!_cache.has(path)) _cache.set(path, newCacheEntry(ctx))

	const cacheEntry = _cache.get(path)
	fastAssert(cacheEntry)
	cacheEntry.write = true

	const needReadWrite = Boolean(
		// eslint-disable-next-line sonarjs/expression-complexity
		options.create ||
			beforeCommits.length > 0 ||
			afterTriggers.length > 0 ||
			schema ||
			ctx.transactor.refCounters,
	)

	if (needReadWrite) {
		await transactionDocPathGet(ctx)

		if (options.create && cacheEntry.data)
			throw new TransactorError(`${ctx.docRef.path.toString()} already exists`)

		// eslint-disable-next-line no-param-reassign
		if (cacheEntry.data) updates = check(ctx, updates, options)
		else {
			// eslint-disable-next-line no-param-reassign
			updates = check(ctx, updates, {
				...options,
				onConstField: 'ignore',
			})
		}

		await processTriggers(ctx, { updates })
	} else {
		// eslint-disable-next-line no-param-reassign
		updates = check(ctx, updates)

		let { data } = cacheEntry

		if (isDefined(data)) {
			data = applyUpdates(data, updates as never) as typeof data
		} else if (isDefined(cacheEntry.updates)) {
			cacheEntry.updates = combineUpdates(
				cacheEntry.updates as never,
				updates as never,
			) as never
		} else {
			cacheEntry.updates = updates
		}

		if (isReplaceIt(cacheEntry.updates) || isDeleteIt(cacheEntry.updates)) {
			fastAssert(data === undefined)
			data = applyUpdates(
				undefined,
				cacheEntry.updates as never,
			) as unknown as typeof data
			delete cacheEntry.updates
		}

		if (isDefined(data)) setCacheEntry(ctx, cacheEntry, data)
	}

	return cacheEntry.proxy as never
}

function transactionUpdate(
	ctx: WithTransactor & WithDocRef & WithTransaction & WithDb,
	updates: Updates,
	options: Partial<UpdateOptions>,
): PromiseLike<$$Doc | null | undefined> {
	fastAssert(updates)
	const { transaction, docRef } = ctx

	if (transaction._isFinalizing)
		throw new TransactorError(
			`db('${docRef.path.toString()}').update() called after transaction body (missing await?)`,
		)

	const promise = transactionUpdateImpl(ctx, updates, options)

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

export function update(
	ctx: Ctx,
	updates: UpdatesRecord,
	options?: Partial<UpdateOptions>,
): PromiseLike<$$Doc | undefined>

export function update(
	ctx: Ctx,
	updates: RootReplaceIt,
	options?: Partial<UpdateOptions>,
): PromiseLike<$$Doc>

export function update(
	ctx: Ctx,
	updates: DeleteIt,
	options?: Partial<UpdateOptions>,
): PromiseLike<null>

export function update(
	ctx: Ctx,
	updates: Updates,
	options?: Partial<UpdateOptions>,
): PromiseLike<$$Doc | null | undefined>

export function update(
	ctx: Ctx,
	updates: Updates,
	options: Partial<UpdateOptions> = {},
): PromiseLike<$$Doc | null | undefined> {
	fastAssert(updates)

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

		return transactionUpdate(ctx, updates, options)
	} else {
		fastAssert(isWithoutTransaction(ctx))
		return rawUpdate(ctx, updates, options) as never
	}
}
