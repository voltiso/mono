// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { lazyPromise, protoLink } from '@voltiso/util'

import type { NestedData } from '~/Data/Data'
import type { IDoc } from '~/Doc'
import { TransactorError } from '~/error'
import { sVoltisoEntry } from '~/schemas'
import type { WithTransaction } from '~/Transaction'

import type { WithDocRef } from './WithDocRef'

type Context = WithDocRef & Partial<WithTransaction>

/** @throws When either Doc or path does not exist */
export type DocFieldPath<D = unknown> = PromiseLike<D> &
	(D extends object ? { [k in keyof D]: DocFieldPath<D[k]> } : unknown)

export const DocFieldPath = class {
	// _context: Context
	// _fields: string[]

	constructor(ctx: Context, fields: string[]) {
		// this._context = ctx
		// this._fields = fields

		const getPromise = async () => {
			// const ctxOverride = ctx.transactor._transactionLocalStorage.getStore()
			const ctxOverride = Zone.current.get('transactionContextOverride') as
				| object
				| undefined

			// eslint-disable-next-line no-param-reassign
			if (ctxOverride) ctx = { ...ctx, ...ctxOverride }

			const doc = await ctx.docRef.get()

			if (fields.length === 1 && fields[0] === '__voltiso' && ctx.transaction) {
				const cacheEntry = ctx.transaction._cache.get(
					ctx.docRef.path.toString(),
				)

				// if (!cacheEntry) {
				// 	console.log('getPromise: sorry, no cacheEntry')
				// 	return null
				// }

				assert(cacheEntry)

				if (!cacheEntry.__voltiso) {
					// console.log('getPromise: create __voltiso entry')
					cacheEntry.__voltiso = sVoltisoEntry.validate(undefined)

					if (cacheEntry.data) {
						assert(!cacheEntry.data.__voltiso)
						cacheEntry.data.__voltiso = cacheEntry.__voltiso
					}
				}

				// console.log('getPromise: returning', cacheEntry.__voltiso)

				assert(cacheEntry.__voltiso)
				return cacheEntry.__voltiso
			}

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!doc) {
				throw new TransactorError(
					`${ctx.docRef.path.toString()}.${fields.join('.')} does not exist`,
				)
			}

			const candidatePaths = [
				fields,
				[
					'__voltiso',
					'aggregateTarget',
					fields[0] as string,
					'value',
					...fields.slice(1),
				],
			]

			for (const path of candidatePaths) {
				let data: NestedData = (doc as IDoc).dataWithoutId() as never

				let isBad = false

				for (const field of path) {
					// if (!isNestedDataRecord(data) || data[field] === undefined)
					const isBadNow =
						typeof data !== 'object' ||
						// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
						data === null ||
						// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
						data === undefined ||
						!(field in data)

					if (isBadNow) {
						isBad = true
						break
					}

					const nextData: NestedData | undefined = data[field as never]

					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					assert(nextData !== undefined)
					data = nextData
				}

				if (!isBad) return data
			}

			throw new TransactorError(
				`${ctx.docRef.path.toString()}.${fields.join('.')} does not exist`,
			)
		}

		// eslint-disable-next-line no-constructor-return
		return new Proxy(protoLink(lazyPromise(getPromise), this), {
			get: (target, p) => {
				if (typeof p === 'symbol' || p in target)
					return Reflect.get(target, p) as unknown
				else return new DocFieldPath(ctx, [...fields, p])
			},
		}) as never
	}
}
