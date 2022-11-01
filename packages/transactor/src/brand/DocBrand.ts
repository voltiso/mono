// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomBrand } from '@voltiso/util'

import type { AnyDoc, DocTag } from '~/DocTypes'

//

declare module '@voltiso/util' {
	interface Brands {
		transactor: {
			/** Mark things as related to a specific Doc type (by DogTag) */
			doc: { [k in DocTag]?: {} }

			/** Mark strings as database IDs */
			id: {}
		}
	}
}

/**
 * Anything can be branded with any subset of DocTags
 *
 * @example
 *
 * ```ts
 * type UserId = string & DocBrand<'users' | 'usersData'>
 *
 * // or, equivalent:
 * type UserId = string & DocBrand<'users'> & DocBrand<'usersData'>
 * ```
 */
export interface DocBrand<tag extends DocTag | AnyDoc>
	extends CustomBrand<
		'transactor.doc',
		tag extends AnyDoc
			? any // {[k in DocTag]: true}
			: tag extends DocTag
			? { [k in tag]: true }
			: never
	> {}
