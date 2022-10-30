// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NotProvided } from '@voltiso/util'

import type { $$DocRelated, DOC, GetDocTag } from '~/Doc'
import type { DocTag } from '~/DocTypes'

/**
 * Anything can be branded with any subset of DocTags
 *
 * @example
 *
 * ```ts
 * type UserId = string & DocBrand<'users' | 'usersData'>
 *
 * // or, equivalent:
 * type UserId = (string & DocBrand<'users'>) | DocBrand<'usersData'>
 * ```
 */
export interface DocBrand<Tag extends DocTag> {
	[DOC]: { [k in Tag]: true }
}

export type Id<TDoc extends $$DocRelated | NotProvided = NotProvided> =
	NotProvided extends TDoc
		? string
		: [TDoc] extends [$$DocRelated]
		? DocTag extends GetDocTag<TDoc>
			? string
			: string & DocBrand<GetDocTag<TDoc>>
		: never

// export interface Id<TDoc extends $$Doc | NotProvided = NotProvided> extends _Id<TDoc> {}

// export type Id<Tag extends DocTag = never> = string & { [k in Tag]: true }
