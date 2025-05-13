// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import chalk from 'chalk'

import type { WithDb } from '~/Db'
import type { CustomDoc, DocImpl, DocTI, IDocImpl } from '~/Doc'
import type { ExecutionContext } from '~/Doc/_/ExecutionContext'
import type { _CustomDocRef, WithDocRef } from '~/DocRef'
import { transactionDocPathGet } from '~/DocRef'
import { TransactorError } from '~/error'
import type { Method } from '~/Method'
import type { Cache, WithTransaction } from '~/Transaction'
import { isWithTransaction, methodGuard } from '~/Transaction'
import type { WithTransactor } from '~/Transactor'
import { dump } from '~/util'

import { processTriggers } from './processTriggers'

export interface CallMethodOptions {
	name: string
	// argSchema?: Schema<unknown>
	localDoc?: IDocImpl
}

// eslint-disable-next-line @typescript-eslint/max-params
export async function callMethod<
	TI extends DocTI,
	EC extends ExecutionContext,
	THIS extends CustomDoc<TI, EC>,
	ARGS extends unknown[],
	R,
>(
	ctx: Partial<WithTransaction> & WithTransactor & WithDocRef & WithDb,
	method: Method<THIS, ARGS, R>,
	args: ARGS,
	options: CallMethodOptions,
): Promise<R> {
	const ctxOverride = ctx.transactor._getTransactionContext()

	// eslint-disable-next-line no-param-reassign
	if (ctxOverride) ctx = { ...ctx, ...ctxOverride }

	const { name, localDoc } = options // argSchema
	const { transactor, transaction, docRef } = ctx
	const path = docRef.path.toString()

	function debugName() {
		return name ? `db("${path}").${name}()` : `db('${path}').pathMethod()`
	}

	if (transaction?._isFinalizing)
		throw new TransactorError(
			`${debugName()} called after transaction body (missing await?)`,
		)

	if (!transaction) {
		let cache: Cache | undefined

		const result = await transactor.runTransaction(() => {
			// eslint-disable-next-line unicorn/consistent-destructuring
			const ctxOverride = ctx.transactor._getTransactionContext()

			assert(ctxOverride)
			const { transaction, db } = ctxOverride
			cache = transaction._cache

			return (db.doc(path) as unknown as _CustomDocRef)._callMethod(
				method as never,
				args,
				options,
			)
		})

		assert(cache)

		const cacheEntry = cache.get(path)
		assert(cacheEntry)

		const { data } = cacheEntry

		if (!data)
			throw new TransactorError(
				`${debugName()} called on non-existing document`,
			)

		if (localDoc) localDoc._setRaw(data)

		return result as never
	}

	assert(isWithTransaction(ctx))
	const doc = await transactionDocPathGet<CustomDoc<TI, 'inside'>>(ctx)

	if (!doc)
		throw new TransactorError(`${debugName()} called on non-existing document`)
	// data._._setContext(this.context)

	if ((doc as unknown as DocImpl)._context.transactor._options.log) {
		// eslint-disable-next-line no-console
		console.log(
			'\n',
			chalk.inverse('CALL method'),
			chalk.blueBright(name),
			'\n',
			path,
			'\n',
			chalk.green(dump(doc.dataWithoutId())),
		)
	}

	const result = await methodGuard(
		ctx,
		async () => method.call(doc as never, ...args), // CAST - hopefully document schema was validated properly in docPath.get
	)

	const cacheEntry = transaction._cache.get(path)
	assert(cacheEntry)
	cacheEntry.write = true

	await processTriggers(ctx)

	if (transaction._isFinalizing)
		throw new TransactorError(
			`${debugName()} called after transaction body (missing await?)`,
		)

	return result
}
