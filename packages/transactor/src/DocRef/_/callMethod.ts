// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import chalk from 'chalk'

import type { WithDb } from '~/Db'
import type { Doc, DocImpl, DocTI, IDocImpl } from '~/Doc'
import type { ExecutionContext } from '~/Doc/_/ExecutionContext'
import type { DocRefBaseImpl, WithDocRef } from '~/DocRef'
import { transactionDocPathGet } from '~/DocRef'
import { TransactorError } from '~/error'
import type { Method } from '~/Method'
import type { Cache, WithTransaction } from '~/Transaction'
import { isWithTransaction, methodGuard } from '~/Transaction'
import type { ContextOverride, WithTransactor } from '~/Transactor'
import { dump } from '~/util'

import { processTriggers } from './processTriggers'

export type CallMethodOptions = {
	name: string
	// argSchema?: Schema<unknown>
	localDoc?: IDocImpl
}

export async function callMethod<
	// eslint-disable-next-line etc/no-misused-generics
	TI extends DocTI,
	// eslint-disable-next-line etc/no-misused-generics
	EC extends ExecutionContext,
	THIS extends Doc<TI, EC>,
	ARGS extends unknown[],
	R,
>(
	ctx: Partial<WithTransaction> & WithTransactor & WithDocRef & WithDb,
	method: Method<THIS, ARGS, R>,
	args: ARGS,
	options: CallMethodOptions,
): Promise<R> {
	const ctxOverride = Zone.current.get('transactionContextOverride') as
		| object
		| undefined

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

	// if (argSchema) {
	// 	if (args.length !== 1) throw new TransactorError('argSchema requires the function to be called with 1 argument')
	// 	await argSchema.validateAsync(args[0], transactor.options.validateOptions)
	// }

	if (!transaction) {
		let cache: Cache | undefined

		const result = await transactor.runTransaction(() => {
			// const ctxOverride = ctx.transactor._transactionLocalStorage.getStore()
			const ctxOverride = Zone.current.get(
				'transactionContextOverride',
			) as ContextOverride

			assert(ctxOverride)
			const { transaction, db } = ctxOverride
			cache = transaction._cache
			return (db.doc(path) as unknown as DocRefBaseImpl)._callMethod(
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
	const doc = await transactionDocPathGet<Doc<TI, 'inside'>>(ctx)

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
