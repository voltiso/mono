// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BRAND, IsAny } from '@voltiso/util'

import type { AnyDoc, DocTag, DocTagLike } from '~/DocTypes'

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
export interface DocBrand<tag extends DocTagLike | AnyDoc = AnyDoc>
	extends TransactorBrand<
		'doc',
		AnyDoc extends tag
			? any // {[k in DocTag]: true}
			: { [k in tag]: true }
	> {}

export type DocTagFromBrand<brand extends DocBrand> = IsAny<
	brand[BRAND][TRANSACTOR]['doc']
> extends true
	? AnyDoc
	: keyof brand[BRAND][TRANSACTOR]['doc'] & DocTag
