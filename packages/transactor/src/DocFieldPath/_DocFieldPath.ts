// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { lazyPromise, protoLink } from '@voltiso/util'

import type { NestedData } from '~/Data'
import { TransactorError } from '~/error'
import { getDefaultVoltisoEntry } from '~/schemas'

import { DocFieldPath } from './DocFieldPath'

function getCandidatePaths(segments: string[]): string[][] {
	const paths = [] as string[][]

	if (segments[0] === 'aggregates') {
		if (!segments[1]) {
			throw new TransactorError(
				`Unable to get single-segment path 'aggregates'`,
			)
		}

		paths.push([
			'__voltiso',
			'aggregateTarget',
			segments[1],
			'value',
			...segments.slice(2),
		])
	}

	paths.push(segments)

	// eslint-disable-next-line unicorn/prefer-single-call
	paths.push([
		'__voltiso',
		'aggregateTarget',
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		segments[0]!,
		'value',
		...segments.slice(1),
	])

	return paths
}

/** @internal */
// @staticImplements<DocFieldPathConstructor>()
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class _DocFieldPath {
	constructor(ctx: DocFieldPath.Context, fields: string[]) {
		// this._context = ctx
		// this._fields = fields

		// eslint-disable-next-line sonarjs/cyclomatic-complexity
		const getPromise = async () => {
			const ctxOverride = ctx.transactor._getTransactionContext()

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
					cacheEntry.__voltiso = getDefaultVoltisoEntry(
						ctx,
						ctx.transaction._date,
					)

					if (cacheEntry.data) {
						assert(!cacheEntry.data.__voltiso)
						cacheEntry.data.__voltiso = cacheEntry.__voltiso
					}
				}

				// console.log('getPromise: returning', cacheEntry.__voltiso)

				assert(cacheEntry.__voltiso)
				return cacheEntry.__voltiso
			}

			if (!doc) {
				throw new TransactorError(
					`${ctx.docRef.path.toString()}.${fields.join('.')} does not exist`,
				)
			}

			const candidatePaths = getCandidatePaths(fields)

			for (const path of candidatePaths) {
				let data: NestedData = doc.dataWithoutId() as never

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

		// eslint-disable-next-line no-constructor-return, sonarjs/no-async-constructor
		return new Proxy(protoLink(lazyPromise(getPromise), this), {
			get: (target, p) => {
				if (typeof p === 'symbol' || p in target)
					return Reflect.get(target, p) as unknown
				else return new DocFieldPath(ctx, [...fields, p])
			},
		}) as never
	}
}
