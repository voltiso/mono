// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Brands, CustomBrand_, PropertyPath } from '@voltiso/util'

import type { DocTag } from '~/DocTypes'

export const TRANSACTOR = Symbol('TRANSACTOR')
export type TRANSACTOR = typeof TRANSACTOR

declare module '@voltiso/util' {
	interface Brands {
		[TRANSACTOR]: {
			/** Mark things as related to a specific Doc type (by DogTag) */
			doc: { [k in DocTag]?: {} }

			/** Mark strings as database IDs */
			id: {}
		}
	}
}

export interface TransactorBrand<
	path extends
		| PropertyPath.ForObject<Brands[TRANSACTOR]>
		| []
		| keyof Brands[TRANSACTOR] = [],
	detail = {},
> extends TransactorBrand.ForPath<
		path extends keyof Brands[TRANSACTOR]
			? [path]
			: path extends PropertyPath.ForObject<Brands[TRANSACTOR]> | []
			? path
			: never,
		detail
	> {}

export namespace TransactorBrand {
	export type ForPath<
		path extends PropertyPath.ForObject<Brands[TRANSACTOR]> | [],
		detail = {},
	> = CustomBrand_<[TRANSACTOR, ...path], detail>
}
