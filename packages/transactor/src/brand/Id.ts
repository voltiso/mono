// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	___,
	AlsoAccept,
	IntersectionFromUnion,
	UNSET,
} from '@voltiso/util'

import type { $$DocRelated, $$DocRelatedLike, GetDocTag } from '~/DocRelated'
import type { ANY_DOC, DocTag } from '~/DocTypes'

import type { TransactorBrand } from './Transactor'

export interface IdBrand extends TransactorBrand<'id'> {}

export type _DocIdBrand<tag extends DocTag | ANY_DOC> = ___<
	TransactorBrand<'id'> &
		TransactorBrand<'doc', tag extends ANY_DOC ? any : { [k in tag]: {} }>
>

export interface DocIdBrand<tag extends DocTag | ANY_DOC = ANY_DOC>
	extends _DocIdBrand<tag> {}

export type GetDocIdBrand<X extends $$DocRelatedLike | UNSET = UNSET> =
	X extends UNSET
		? DocIdBrand
		: X extends $$DocRelatedLike
			? ANY_DOC extends GetDocTag<X>
				? DocIdBrand
				: GetDocTag<X> extends never
					? DocIdBrand
					: GetDocTag<X> extends DocTag
						? DocIdBrand<GetDocTag<X>>
						: never
			: never

export type IdString = string & IdBrand

export type DocIdString<X extends $$DocRelated | UNSET = UNSET> = [X] extends [
	never,
]
	? string & DocIdBrand
	: string & IntersectionFromUnion<GetDocIdBrand<X>>

export type DocIdString_<
	X extends DocTag | AlsoAccept<$$DocRelatedLike> | UNSET = UNSET,
> = [string & GetDocIdBrand<X>][0]
