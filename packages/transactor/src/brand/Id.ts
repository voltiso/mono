// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	___,
	AlsoAccept,
	IntersectionFromUnion,
	NoArgument,
} from '@voltiso/util'

import type { $$DocRelated, $$DocRelatedLike, GetDocTag } from '~/DocRelated'
import type { AnyDoc, DocTag } from '~/DocTypes'

import type { TransactorBrand } from './Transactor'

export interface IdBrand extends TransactorBrand<'id'> {}

export type _DocIdBrand<tag extends DocTag | AnyDoc> = ___<
	TransactorBrand<'id'> &
		TransactorBrand<'doc', tag extends AnyDoc ? any : { [k in tag]: {} }>
>

export interface DocIdBrand<tag extends DocTag | AnyDoc = AnyDoc>
	extends _DocIdBrand<tag> {}

export type GetDocIdBrand<
	X extends $$DocRelatedLike | NoArgument = NoArgument,
> = X extends NoArgument
	? DocIdBrand
	: X extends $$DocRelatedLike
	? AnyDoc extends GetDocTag<X>
		? DocIdBrand
		: GetDocTag<X> extends never
		? DocIdBrand
		: GetDocTag<X> extends DocTag
		? DocIdBrand<GetDocTag<X>>
		: never
	: never

export type IdString = string & IdBrand

export type DocIdString<X extends $$DocRelated | NoArgument = NoArgument> = [
	X,
] extends [never]
	? string & DocIdBrand
	: string & IntersectionFromUnion<GetDocIdBrand<X>>

export type DocIdString_<
	X extends DocTag | AlsoAccept<$$DocRelatedLike> | NoArgument = NoArgument,
> = [string & GetDocIdBrand<X>][0]
