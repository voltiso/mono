// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import { lazyPromise, protoLink, undef } from '@voltiso/util'

import type { NestedData } from '~/Data/Data'
import type { WithTransaction } from '~/Transaction'

import type { WithDocRef } from './WithDocRef'

type Context = WithDocRef & Partial<WithTransaction>

export type DocFieldPath<D = unknown> = PromiseLike<D> &
	(D extends object ? { [k in keyof D]: DocFieldPath<D[k]> } : unknown)

export const DocFieldPath = class {
	_context: Context
	_fields: string[]

	constructor(ctx: Context, fields: string[]) {
		this._context = ctx
		this._fields = fields

		const getPromise = async () => {
			const doc = await ctx.docRef.get()

			if (fields.length === 1 && fields[0] === '__voltiso' && ctx.transaction) {
				const cacheEntry = ctx.transaction._cache.get(
					ctx.docRef.path.pathString,
				)

				if (!cacheEntry) return null

				if (!cacheEntry.__voltiso) {
					cacheEntry.__voltiso = { numRefs: 0 }

					if (cacheEntry.data) {
						$assert(!cacheEntry.data.__voltiso)
						cacheEntry.data.__voltiso = cacheEntry.__voltiso
					}
				}

				$assert(cacheEntry.__voltiso)
				return cacheEntry.__voltiso
			}

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (!doc) {
				throw new Error(
					`${ctx.docRef.path.pathString}.${fields.join('.')} does not exist`,
				)
			}

			let data: NestedData = doc.dataWithoutId() as never

			for (const field of fields) {
				// if (!isNestedDataRecord(data) || data[field] === undefined)
				if (
					typeof data !== 'object' ||
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					data === null ||
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					data === undef ||
					!(field in data)
				)
					throw new Error(
						`${ctx.docRef.path.toString()}.${fields.join('.')} does not exist`,
					)

				const nextData: NestedData | undefined = data[field as never]
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				$assert(nextData !== undef)
				data = nextData
			}

			return data
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
