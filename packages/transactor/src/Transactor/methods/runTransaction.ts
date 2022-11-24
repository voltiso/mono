// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import {
	assert,
	deleteIt,
	isDefined,
	isDeleteIt,
	replaceIt,
} from '@voltiso/util'
import { deepCloneData } from '@voltiso/util.firestore'
import chalk from 'chalk'

import { databaseUpdate } from '~/common/database/databaseUpdate'
import { withoutId } from '~/Data'
import type { CustomDoc, DocTI } from '~/Doc'
import { CustomDocRef, getBeforeCommits, processTriggers } from '~/DocRef'
import { TransactorError } from '~/error'
import { sVoltisoEntry } from '~/schemas'
import type { Cache, CacheEntry } from '~/Transaction'
import { setCacheEntry, Transaction, triggerGuard } from '~/Transaction'
import type { Transactor } from '~/Transactor'
import type { TriggerParams } from '~/Trigger'
import { dump } from '~/util/dump'
import { isEqual } from '~/util/isEqual'

export type TransactionBody<Result> = (db: Transaction) => Promise<Result>

const getCacheSnapshot = (cache: Cache) => {
	const r = {} as Record<string, Partial<CacheEntry>>

	for (const [k, v] of cache.entries()) {
		// eslint-disable-next-line security/detect-object-injection
		const entry = (r[k] = {}) as Partial<CacheEntry>

		if ('data' in v) entry.data = deepCloneData(v.data)
	}

	return r
}

export async function runTransaction<R>(
	ctx: Transactor,
	body: (t: Transaction) => Promise<R>,
): Promise<R> {
	if (Zone.current.get('transactionContextOverride')) {
		// already in transaction
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const transaction = Zone.current.get('transactionContextOverride')
			.transaction as Transaction | undefined
		assert(transaction)
		return body(transaction)
	}

	const zoneCurrent = Zone.current // firestore library code destroys current zone! (?!)

	const options: Database.TransactionOptions = {
		// maxAttempts: 1,
	}

	return ctx._database.runTransaction(databaseTransaction => {
		const transaction = new Transaction(ctx._context, databaseTransaction)

		// if (zoneCurrent.get('transactionContextOverride'))
		// 	throw new TransactorError('cannot run transactions inside transactions')

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

		return zoneChild.run(async () => {
			const cache = transaction._cache

			let transactionResult
			try {
				transactionResult = await body(transaction)

				let cacheSnapshot = getCacheSnapshot(cache)

				// console.log('snap', cacheSnapshot)

				// loop final after and beforeCommit triggers while there are changes in cache
				for (;;) {
					// detect local changes and set write=true
					for (const [_path, cacheEntry] of cache.entries()) {
						// if (!cacheEntry.write) {
						// 	console.log(
						// 		'check if should write',
						// 		cacheEntry.data,
						// 		cacheEntry.originalData,
						// 	)
						// }

						if (
							!cacheEntry.write &&
							(!isEqual(cacheEntry.data, cacheEntry.originalData) ||
								(!cacheEntry.data &&
									!isEqual(
										cacheEntry.__voltiso,
										sVoltisoEntry.validate(undefined),
									)))
						) {
							// console.log(
							// 	'detected change',
							// 	path,
							// 	cacheEntry.data,
							// 	cacheEntry.__voltiso,
							// )
							cacheEntry.write = true
						}
					}

					//

					// process triggers (again)
					for (const [path, cacheEntry] of cache.entries()) {
						if (!cacheEntry.write) continue

						// console.log('should write!')
						const docRef = new CustomDocRef(transaction._context, path, {
							isStrong: true,
						})
						const ctx = { ...transaction._context, docRef }

						// process normal triggers - they may not have been called if updates were made in-place, not via `update` method
						// eslint-disable-next-line no-await-in-loop
						if (isDefined(cacheEntry.data)) await processTriggers(ctx as never)
					}

					const nextCacheSnapshot = getCacheSnapshot(cache)

					// start over?
					if (!isEqual(nextCacheSnapshot, cacheSnapshot)) {
						cacheSnapshot = nextCacheSnapshot

						if (ctx._options.log) {
							// eslint-disable-next-line no-console
							console.log(
								'\n',
								chalk.inverse(
									'REPEAT TRIGGERS - CACHE CHANGED after regular triggers',
								),
								'\n',
								dump(cacheSnapshot),
							)
						}

						continue
					}

					//

					// process before-commits
					for (const [path, cacheEntry] of cache.entries()) {
						if (!cacheEntry.write) continue

						// console.log('should write!')
						const docRef = new CustomDocRef(transaction._context, path, {
							isStrong: true,
						})
						const ctx = { ...transaction._context, docRef }

						const beforeCommits = getBeforeCommits(docRef)

						for (const { trigger, pathMatches } of beforeCommits) {
							let triggerResult: Awaited<ReturnType<typeof trigger>>
							// eslint-disable-next-line no-await-in-loop
							await triggerGuard(ctx, async () => {
								assert(isDefined(cacheEntry.proxy))

								assert(cacheEntry.__voltiso)

								const params: TriggerParams.BeforeCommit<
									CustomDoc<DocTI, 'inside'>
								> = {
									doc: cacheEntry.proxy as never,
									...pathMatches,
									path: docRef.path as never,
									id: docRef.id as never,
									...docRef._context,
									__voltiso: cacheEntry.__voltiso,
									possiblyExists: cacheEntry.possiblyExists,
								} as never

								triggerResult = await trigger.call(
									cacheEntry.proxy as never,
									params as never,
								)
							})

							// eslint-disable-next-line max-depth
							if (isDefined(triggerResult)) {
								// eslint-disable-next-line max-depth
								if (isDeleteIt(triggerResult))
									setCacheEntry(ctx, cacheEntry, null)
								else {
									const { allowIdField, allowValidIdField } =
										ctx.transactor._options

									const shouldStripId = !allowIdField && !allowValidIdField

									const data = shouldStripId
										? withoutId(triggerResult, docRef.id)
										: triggerResult
									setCacheEntry(ctx, cacheEntry, data as never)
								}
							}
						}
					}

					const finalCacheSnapshot = getCacheSnapshot(cache)

					// start over?
					if (!isEqual(finalCacheSnapshot, cacheSnapshot)) {
						cacheSnapshot = finalCacheSnapshot

						if (ctx._options.log) {
							// eslint-disable-next-line no-console
							console.log(
								'\n',
								chalk.inverse(
									'REPEAT TRIGGERS - CACHE CHANGED after before-commits',
								),
								'\n',
								dump(cacheSnapshot),
							)
						}

						continue
					}

					break
				}
			} catch (error) {
				for (const cacheEntry of cache.values()) {
					delete cacheEntry.proxy
				}

				if (ctx._options.log) {
					// eslint-disable-next-line no-console
					console.log(
						'\n',
						chalk.inverse('TRANSACTION CACHE AFTER ERROR'),
						'\n',

						dump(cache),
					)
				}

				throw error
			} finally {
				// eslint-disable-next-line require-atomic-updates
				transaction._isFinalizing = true
			}

			if (transaction._numFloatingPromises)
				throw new TransactorError(
					`numFloatingPromises: ${transaction._numFloatingPromises} (missing await?)`,
				)

			for (const [path, cacheEntry] of cache.entries()) {
				if (cacheEntry.write) {
					const dbCtx = ctx._databaseContext
					assert(dbCtx)

					if (isDefined(cacheEntry.updates)) {
						assert(cacheEntry.data === undefined)
						// eslint-disable-next-line no-await-in-loop
						await databaseUpdate(
							ctx,
							dbCtx,
							databaseTransaction,
							ctx._database.doc(path),
							cacheEntry.updates,
						)
					} else if (cacheEntry.data === null) {
						// eslint-disable-next-line no-await-in-loop
						await databaseUpdate(
							ctx,
							dbCtx,
							databaseTransaction,
							ctx._database.doc(path),
							deleteIt,
						)
					} else {
						assert(cacheEntry.data)
						// eslint-disable-next-line no-await-in-loop
						await databaseUpdate(
							ctx,
							dbCtx,
							databaseTransaction,
							ctx._database.doc(path),
							replaceIt(cacheEntry.data),
						)
					}
				}
			}

			return transactionResult
		})
	}, options)
}
