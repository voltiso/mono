// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type * as Database from '@voltiso/firestore-like'
import {
	deleteIt,
	fastAssert,
	isDefined,
	isDeleteIt,
	replaceIt,
} from '@voltiso/util'
import { deepCloneData } from '@voltiso/util.firestore'
import chalk from 'chalk'

import { databaseUpdate } from '~/common/database/databaseUpdate'
import { withoutId } from '~/Data'
import type { CustomDoc, DocTI } from '~/Doc'
import {
	_CustomDocRef,
	CustomDocRef,
	getBeforeCommits,
	processTriggers,
} from '~/DocRef'
import { TransactorError } from '~/error'
import { getDefaultVoltisoEntry } from '~/schemas'
import type { Cache, CacheEntry } from '~/Transaction'
import { setCacheEntry, Transaction, triggerGuard } from '~/Transaction'
import type { Transactor } from '~/Transactor'
import type { TriggerParams } from '~/Trigger'
import { dump } from '~/util/dump'
import { isEqual } from '~/util/isEqual'

export type TransactionBody<Result> = (db: Transaction) => Promise<Result>

function getCacheSnapshot(cache: Cache) {
	const r = {} as Record<string, Partial<CacheEntry>>

	for (const [k, v] of cache.entries()) {
		// eslint-disable-next-line sonarjs/no-nested-assignment
		const entry = (r[k] = {}) as Partial<CacheEntry>

		if ('data' in v) entry.data = deepCloneData(v.data)
	}

	return r
}

export async function runTransaction<R>(
	transactor: Transactor,
	body: (t: Transaction) => Promise<R>,
): Promise<R> {
	const ctxOverride = transactor._getTransactionContext()

	if (ctxOverride) {
		// already in transaction
		fastAssert(ctxOverride.transaction)
		return body(ctxOverride.transaction)
	}

	// const zoneCurrent = Zone.current // ! firestore library code destroys current zone! (?!)

	const options: Database.TransactionOptions = {
		// maxAttempts: 1,
	}

	return transactor._database.runTransaction(databaseTransaction => {
		const transaction = new Transaction(
			transactor._context,
			databaseTransaction,
		)

		const transactionContextOverride = {
			transaction,
			db: transaction._context.db,
		}

		$assert.not(ctxOverride)

		return transactor._runWithContext(
			transactionContextOverride,
			// eslint-disable-next-line sonarjs/cyclomatic-complexity
			async () => {
				const cache = transaction._cache

				let transactionResult
				try {
					transactionResult = await body(transaction)

					let cacheSnapshot = getCacheSnapshot(cache)

					// console.log('snap', cacheSnapshot)

					// loop final after and beforeCommit triggers while there are changes in cache
					// eslint-disable-next-line sonarjs/too-many-break-or-continue-in-loop
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

							// eslint-disable-next-line sonarjs/nested-control-flow
							if (
								!cacheEntry.write &&
								(!isEqual(cacheEntry.data, cacheEntry.originalData) ||
									(!cacheEntry.data &&
										!isEqual(
											cacheEntry.__voltiso,
											getDefaultVoltisoEntry({ transactor }, transaction._date),
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
							// eslint-disable-next-line sonarjs/nested-control-flow
							if (!cacheEntry.write) continue

							// console.log('should write!')
							const docRef = new CustomDocRef(transaction._context, path, {
								isStrong: true,
							})
							const ctx = { ...transaction._context, docRef }

							// process normal triggers - they may not have been called if updates were made in-place, not via `update` method
							// eslint-disable-next-line sonarjs/nested-control-flow
							if (isDefined(cacheEntry.data)) {
								// eslint-disable-next-line no-await-in-loop
								await processTriggers(ctx as never)
							}
						}

						const nextCacheSnapshot = getCacheSnapshot(cache)

						// start over?
						if (!isEqual(nextCacheSnapshot, cacheSnapshot)) {
							cacheSnapshot = nextCacheSnapshot

							// eslint-disable-next-line sonarjs/nested-control-flow
							if (transactor._options.log) {
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
							// eslint-disable-next-line sonarjs/nested-control-flow
							if (!cacheEntry.write) continue

							// console.log('should write!')
							const docRef = new _CustomDocRef(transaction._context, path, {
								isStrong: true,
							})

							const ctx = { ...transaction._context, docRef }

							const beforeCommits = getBeforeCommits(docRef)

							// eslint-disable-next-line sonarjs/nested-control-flow
							for (const { trigger, pathMatches } of beforeCommits) {
								let triggerResult: Awaited<ReturnType<typeof trigger>>
								// eslint-disable-next-line no-await-in-loop
								await triggerGuard(ctx, async () => {
									fastAssert(isDefined(cacheEntry.proxy))

									fastAssert(cacheEntry.__voltiso)

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

							// eslint-disable-next-line sonarjs/nested-control-flow
							if (transactor._options.log) {
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

					if (transactor._options.log) {
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
						const dbCtx = transactor._databaseContext
						fastAssert(dbCtx)

						if (isDefined(cacheEntry.updates)) {
							fastAssert(cacheEntry.data === undefined)
							// eslint-disable-next-line no-await-in-loop
							await databaseUpdate(
								transactor,
								dbCtx,
								databaseTransaction,
								transactor._database.doc(path),
								cacheEntry.updates,
							)
						} else if (cacheEntry.data === null) {
							// eslint-disable-next-line no-await-in-loop
							await databaseUpdate(
								transactor,
								dbCtx,
								databaseTransaction,
								transactor._database.doc(path),
								deleteIt,
							)
						} else {
							fastAssert(cacheEntry.data)
							// eslint-disable-next-line no-await-in-loop
							await databaseUpdate(
								transactor,
								dbCtx,
								databaseTransaction,
								transactor._database.doc(path),
								replaceIt(cacheEntry.data),
							)
						}
					}
				}

				return transactionResult
			},
		)
	}, options)
}
