// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Brand, CustomBrand, NoArgument } from '@voltiso/util'

import type { $$DocRelatedLike, GetDocTag } from '~/DocRelated'
import type { AnyDoc, DocTag } from '~/DocTypes'

export interface IdBrand extends Brand<'transactor.id'> {}

export type _DocIdBrand<tag extends DocTag> = Brand<'transactor.id'> &
	CustomBrand<'transactor.doc', { [k in tag]: {} }>

export interface AnyDocIdBrand extends _DocIdBrand<DocTag> {}

export interface DocIdBrand<tag extends DocTag> extends _DocIdBrand<tag> {}

export type GetIdBrand<X extends $$DocRelatedLike | NoArgument = NoArgument> =
	X extends NoArgument
		? IdBrand
		: X extends $$DocRelatedLike
		? AnyDoc extends GetDocTag<X>
			? AnyDocIdBrand
			: GetDocTag<X> extends never
			? AnyDocIdBrand
			: GetDocTag<X> extends DocTag
			? DocIdBrand<GetDocTag<X>>
			: never
		: never

export type IdString = string & IdBrand

export type DocIdString<X extends $$DocRelatedLike | NoArgument = NoArgument> =
	[string & GetIdBrand<X>][0]
