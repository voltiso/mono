// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Brand, CustomBrand, NoArgument } from '@voltiso/util'

import type { $$DocRelatedLike, GetDocTag } from '~/DocRelated'
import type { AnyDoc, DocTag } from '~/DocTypes'

export interface IdBrand extends Brand<'transactor.id'> {}

export type _DocIdBrand<tag extends DocTag | AnyDoc> = Brand<'transactor.id'> &
	CustomBrand<'transactor.doc', tag extends AnyDoc ? any : { [k in tag]: {} }>

export interface DocIdBrand<tag extends DocTag | AnyDoc = AnyDoc>
	extends _DocIdBrand<tag> {}

export type GetDocIdBrand<
	X extends $$DocRelatedLike | NoArgument = NoArgument,
> = X extends NoArgument
	? IdBrand
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

export type DocIdString<X extends $$DocRelatedLike | NoArgument = NoArgument> =
	[string & GetDocIdBrand<X>][0]
