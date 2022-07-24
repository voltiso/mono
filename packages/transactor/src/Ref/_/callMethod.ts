// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import chalk from 'chalk'

import type { WithDb } from '../../Db'
import type { IDoc_, IDocTI } from '../../Doc'
import type { ExecutionContext, GDoc } from '../../Doc/_'
import type { Method } from '../../Method.js'
import type { Cache, WithTransaction } from '../../Transaction'
import { isWithTransaction, methodGuard } from '../../Transaction'
import type { ContextOverride, WithTransactor } from '../../Transactor'
import { dump } from '../../util'
import type { DocRefBase_ } from '../DocRefBase.js'
import { transactionDocPathGet } from '../methods'
import type { WithDocRef } from '../WithDocRef.js'
import { processTriggers } from './processTriggers.js'

export type CallMethodOptions = {
	name: string
	// argSchema?: Schema<unknown>
	localDoc?: IDoc_
}

export async function callMethod<
	// eslint-disable-next-line etc/no-misused-generics
	TI extends IDocTI,
	// eslint-disable-next-line etc/no-misused-generics
	EC extends ExecutionContext,
	THIS extends GDoc<TI, EC>,
	ARGS extends unknown[],
	R,
>(
	ctx: Partial<WithTransaction> & WithTransactor & WithDocRef & WithDb,
	method: Method<THIS, ARGS, R>,
	args: ARGS,
	options: CallMethodOptions,
): Promise<R> {
	const { name, localDoc } = options // argSchema
	const { transactor, transaction, docRef: docPath } = ctx
	const path = docPath.path.toString()

	const debugName = () =>
		name ? `db("${path}").${name}()` : `db('${path}').pathMethod()`

	if (transaction?._isFinalizing)
		throw new Error(
			`${debugName()} called after transaction body (missing await?)`,
		)

	// if (argSchema) {
	// 	if (args.length !== 1) throw new Error('argSchema requires the function to be called with 1 argument')
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
			return (db.doc(path) as unknown as DocRefBase_)._callMethod(
				method as never,
				args,
				options,
			)
		})

		assert(cache)

		// eslint-disable-next-line security/detect-object-injection
		const cachePath = cache[path]
		assert(cachePath)

		const data = cachePath.data

		if (!data) throw new Error(`${debugName()} called on non-existing document`)

		if (localDoc) localDoc._setRaw(data)

		return result as never
	}

	assert(isWithTransaction(ctx))
	const doc = await transactionDocPathGet<GDoc<TI, 'inside'>>(ctx)

	if (!doc) throw new Error(`${debugName()} called on non-existing document`)
	// data._._setContext(this.context)

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

	const result = await methodGuard(ctx, async () => {
		return method.call(doc as never, ...args) // CAST - hopefully document schema was validated properly in docPath.get
	})

	// eslint-disable-next-line security/detect-object-injection
	const cacheEntry = transaction._cache[path]
	assert(cacheEntry)
	cacheEntry.write = true

	await processTriggers(ctx)

	if (transaction._isFinalizing)
		throw new Error(
			`${debugName()} called after transaction body (missing await?)`,
		)

	return result
}