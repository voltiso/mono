// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $_ } from '@voltiso/util'

import type { DocLike, IDoc } from '~/Doc'
import type { DocRefLike } from '~/DocRef'

import type { Id } from './Id'

export type LeafData = boolean | string | number | null | Date | DocRefLike

// NestedData
export type DataRecord = {
	[k: string]: NestedData
}
export const isNestedDataRecord = (x: NestedData): x is DataRecord =>
	x?.constructor === Object

export type NestedDataNoArray = DataRecord | LeafData
export type NestedData = NestedDataNoArray | NestedDataNoArray[] // array of arrays not possible

/** @inline */
export type WithId<Data, Doc extends DocLike = IDoc> = Doc extends any
	? $_<{ id: Id<Doc> } & Data>
	: never
