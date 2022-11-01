// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Brand, CustomBrand, NoArgument } from '@voltiso/util'

import type { $$DocRelated, GetDocTag } from '~/Doc'
import type { AnyDocTag, DocTag } from '~/DocTypes'

export interface IdBrand extends Brand<'transactor.id'> {}

export type _DocIdBrand<tag extends DocTag> = Brand<'transactor.id'> &
	CustomBrand<'transactor.doc', { [k in tag]: {} }>

export interface AnyDocIdBrand extends _DocIdBrand<DocTag> {}

export interface DocIdBrand<tag extends DocTag> extends _DocIdBrand<tag> {}

export type GetIdBrand<X extends $$DocRelated | NoArgument = NoArgument> =
	X extends NoArgument
		? IdBrand
		: X extends $$DocRelated
		? AnyDocTag extends GetDocTag<X>
			? AnyDocIdBrand
			: GetDocTag<X> extends never
			? AnyDocIdBrand
			: DocIdBrand<GetDocTag<X>>
		: never

export type IdString = string & IdBrand

export type DocIdString<X extends $$DocRelated | NoArgument = NoArgument> = [
	string & GetIdBrand<X>,
][0]
