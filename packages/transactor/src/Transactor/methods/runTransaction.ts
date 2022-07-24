// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import '../../zone.js'

import { assert } from '@voltiso/assertor'
import type * as Database from '@voltiso/firestore-like'
import {
	clone,
	getEntries,
	getKeys,
	getValues,
	isDefined,
	undef,
} from '@voltiso/util'
import chalk from 'chalk'

import { databaseUpdate } from '../../common/database/databaseUpdate.js'
import { withoutId } from '../../Data'
import type { Doc, IDocTI } from '../../Doc'
import { TransactorError } from '../../error'
import { deleteIt, isDeleteIt, replaceIt } from '../../it'
import { DocRef_ } from '../../Ref'
import { getBeforeCommits } from '../../Ref/_/getBeforeCommits.js'
import { processTriggers } from '../../Ref/_/processTriggers.js'
import { Transaction_ } from '../../Transaction'
import type { Cache, CacheEntry } from '../../Transaction/Cache.js'
import { triggerGuard } from '../../Transaction/guard.js'
import { setCacheEntry } from '../../Transaction/methods/setCacheEntry.js'
import type { Transaction } from '../../Transaction/Transaction.js'
import type { BeforeCommitTriggerParams } from '../../Trigger/TriggerParams.js'
import { dump } from '../../util/dump.js'
import { isEqual } from '../../util/isEqual.js'
import type { Transactor_ } from '../Transactor_.js'

export type TransactionBody<Result> = (db: Transaction) => Promise<Result>

const getCacheSnapshot = (cache: Cache) => {
	const r = {} as Record<string, Partial<CacheEntry>>

	for (const [k, v] of Object.entries(cache)) {
		// eslint-disable-next-line security/detect-object-injection
		const entry = (r[k] = {}) as Partial<CacheEntry>

		if ('data' in v) entry.data = clone(v.data)
		// entry.lastDataSeenByAfters = clone(v.lastDataSeenByAfters)
	}

	return r
}

export async function runTransaction<R>(
	this: Transactor_,
	body: (t: Transaction) => Promise<R>,
): Promise<R> {
	const zoneCurrent = Zone.current // firestore library code destroys current zone! (?!)

	const options: Database.TransactionOptions = {
		// maxAttempts: 1,
	}

	// eslint-disable-next-line sonarjs/cognitive-complexity
	return this._database.runTransaction(databaseTransaction => {
		const transaction = new Transaction_(this._context, databaseTransaction)

		// if (this._transactionLocalStorage.getStore() !== undefined)
		if (zoneCurrent.get('transactionContextOverride'))
			throw new TransactorError('cannot run transactions inside transactions')

		const transactionContextOverride = {
			transaction,
			db: transaction._context.db,
		}

		// return this._transactionLocalStorage.run(transactionContextOverride, async () => {
		const zoneChild = zoneCurrent.fork({
			name: 'Transaction',

			properties: {
				transactionContextOverride,
			},
		})

		// eslint-disable-next-line max-statements
		return zoneChild.run(async () => {
			const cache = transaction._cache

			let r
			try {
				r = await body(transaction)

				let cacheSnapshot = getCacheSnapshot(cache)

				// loop final after and beforeCommit triggers while there are changes in cache
				for (;;) {
					// detect local changes and set write=true
					for (const path of getKeys(cache)) {
						// eslint-disable-next-line security/detect-object-injection
						const cacheEntry = cache[path]
						assert(cacheEntry)

						if (
							!cacheEntry.write &&
							!isEqual(cacheEntry.data, cacheEntry.originalData)
						)
							cacheEntry.write = true
					}

					// process beforeCommits
					for (const [path, cacheEntry] of getEntries(cache)) {
						if (cacheEntry.write) {
							const docRef = new DocRef_(transaction._context, path)
							const ctx = { ...transaction._context, docRef }

							// process normal triggers - they may not have been called if updates were made in-place, not via `update` method
							// eslint-disable-next-line max-depth, no-await-in-loop
							if (isDefined(cacheEntry.data)) await processTriggers(ctx)

							const beforeCommits = getBeforeCommits.call(docRef)

							// eslint-disable-next-line max-depth
							for (const { trigger, pathMatches } of beforeCommits) {
								let r: Awaited<ReturnType<typeof trigger>>
								// eslint-disable-next-line no-await-in-loop
								await triggerGuard(ctx, async () => {
									assert(isDefined(cacheEntry.proxy))

									const params: BeforeCommitTriggerParams<
										Doc<IDocTI, 'inside'>
									> = {
										doc: cacheEntry.proxy as never,
										...pathMatches,
										path: docRef.path as never,
										id: docRef.id as never,
										...docRef._context,
									}

									if (cacheEntry.__voltiso)
										params.__voltiso = cacheEntry.__voltiso

									r = await trigger.call(cacheEntry.proxy as never, params)
								})

								// eslint-disable-next-line max-depth
								if (isDefined(r)) {
									// eslint-disable-next-line max-depth
									if (isDeleteIt(r)) setCacheEntry.call(ctx, cacheEntry, null)
									else {
										setCacheEntry.call(
											ctx,
											cacheEntry,
											withoutId(r as never, docRef.id) as never,
										)
									}
								}
							}
						}
					}

					const newCacheSnapshot = getCacheSnapshot(cache)

					if (isEqual(newCacheSnapshot, cacheSnapshot)) break

					cacheSnapshot = newCacheSnapshot
					// eslint-disable-next-line no-console
					console.log(
						'\n',
						chalk.inverse('REPEAT TRIGGERS - CACHE CHANGED'),
						'\n',
						dump(cacheSnapshot),
					)
				}
			} catch (error) {
				for (const cacheEntry of getValues(cache)) {
					delete cacheEntry.proxy
				}

				// eslint-disable-next-line no-console
				console.log(
					'\n',
					chalk.inverse('TRANSACTION CACHE AFTER ERROR'),
					'\n',

					dump(cache),
				)
				throw error
			} finally {
				transaction._isFinalizing = true
			}

			if (transaction._numFloatingPromises)
				throw new Error(
					`numFloatingPromises: ${transaction._numFloatingPromises} (missing await?)`,
				)

			for (const [path, cacheEntry] of Object.entries(cache)) {
				if (cacheEntry.write) {
					const dbCtx = this._databaseContext
					assert(dbCtx)

					if (isDefined(cacheEntry.updates)) {
						assert(cacheEntry.data === undef)
						// eslint-disable-next-line no-await-in-loop
						await databaseUpdate(
							dbCtx,
							databaseTransaction,
							this._database.doc(path),
							cacheEntry.updates,
						)
					} else if (cacheEntry.data === null) {
						// eslint-disable-next-line no-await-in-loop
						await databaseUpdate(
							dbCtx,
							databaseTransaction,
							this._database.doc(path),
							deleteIt(),
						)
					} else {
						assert(cacheEntry.data)
						// eslint-disable-next-line no-await-in-loop
						await databaseUpdate(
							dbCtx,
							databaseTransaction,
							this._database.doc(path),
							replaceIt(cacheEntry.data),
						)
					}
				}
			}

			return r
		})
	}, options)
}
