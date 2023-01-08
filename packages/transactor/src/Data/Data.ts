// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Output } from '@voltiso/schemar'
import type { _, $_, NoArgument } from '@voltiso/util'

import type { DocIdString, DocIdString_ } from '~/brand'
import type { $$DocRef } from '~/DocRef'
import type { $$DocRelated, $$DocRelatedLike, GetDocTI } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'

export type LeafData = boolean | string | number | null | Date | $$DocRef

// NestedData
export type DataRecord = {
	[k: string]: NestedData
}
export const isNestedDataRecord = (x: NestedData): x is DataRecord =>
	x?.constructor === Object

export type NestedDataNoArray = DataRecord | LeafData
export type NestedData = NestedDataNoArray | NestedDataNoArray[] // array of arrays not possible

/** @inline */
export type WithId<Data = unknown, R extends $$DocRelated = AnyDoc> = _<
	{
		readonly id: DocIdString<R> & Output<GetDocTI<R>['id']>
	} & Data
>

/** @inline */
export type $WithId<
	Data = unknown,
	R extends $$DocRelatedLike | NoArgument = NoArgument,
> = Data extends any
	? R extends any
		? $_<
				{
					readonly id: DocIdString_<R> &
						(R extends $$DocRelatedLike
							? Output<GetDocTI<R & $$DocRelatedLike>['id']>
							: unknown)
				} & Data
		  >
		: never
	: never
