// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BRAND, IsAny } from '@voltiso/util'

import type { ANY_DOC, DocTag, DocTagLike } from '~/DocTypes'

import type { TRANSACTOR, TransactorBrand } from './Transactor'

//

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
export interface DocBrand<tag extends DocTagLike | ANY_DOC = ANY_DOC>
	extends TransactorBrand<
		'doc',
		ANY_DOC extends tag
			? any // {[k in DocTag]: true}
			: { [k in tag]: true }
	> {}

export type DocTagFromBrand<brand extends DocBrand> =
	IsAny<brand[BRAND][TRANSACTOR]['doc']> extends true
		? ANY_DOC
		: keyof brand[BRAND][TRANSACTOR]['doc'] & DocTag
