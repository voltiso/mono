// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Output, Output_ } from '@voltiso/schemar'
import type { _, $_, UNSET } from '@voltiso/util'

import type { DocIdString_ } from '~/brand'
import type { $$DocRef } from '~/DocRef'
import type { $$DocRelatedLike, GetDocTI } from '~/DocRelated'
import type { ANY_DOC } from '~/DocTypes'

export type LeafData = boolean | string | number | null | Date | $$DocRef

// NestedData
export interface DataRecord {
	[k: string]: NestedData
}
export const isNestedDataRecord = (x: NestedData): x is DataRecord =>
	x?.constructor === Object

export type NestedDataNoArray = DataRecord | LeafData
export type NestedData = NestedDataNoArray | NestedDataNoArray[] // array of arrays not possible

/** @inline */
export type WithId<Data = unknown, R extends $$DocRelatedLike = ANY_DOC> = _<
	{
		readonly id: GetId<R>
	} & Data
>

export type GetId<R extends $$DocRelatedLike> = [
	DocIdString_<R> & Output_<GetDocTI<R>['id']>,
][0]

/** @inline */
export type $WithId<
	Data = unknown,
	R extends $$DocRelatedLike | UNSET = UNSET,
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
