// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, $_, NoArgument } from '@voltiso/util'

import type { $$Doc, IDoc } from '~/Doc'
import type { $$DocRef } from '~/DocRef'
import type { $$DocRelatedLike } from '~/DocRelated'

import type { DocIdString } from './Id'

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
export type WithId<Data = unknown, Doc extends $$Doc = IDoc> = _<
	{ id: DocIdString<Doc> } & Data
>

/** @inline */
export type $WithId<
	Data = unknown,
	R extends $$DocRelatedLike | NoArgument = NoArgument,
> = Data extends any
	? R extends any
		? $_<{ readonly id: DocIdString<R> } & Data>
		: never
	: never
