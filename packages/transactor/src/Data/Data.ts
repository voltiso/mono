// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, $_ } from '@voltiso/util'

import type { $$Doc, IDoc } from '~/Doc'
import type { $$DocRef } from '~/DocRef'

import type { Id } from './Id'

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
	{ id: Id<Doc> } & Data
>

/** @inline */
export type $WithId<Data = unknown, Doc extends $$Doc = IDoc> = Data extends any
	? Doc extends any
		? $_<{ readonly id: Id<Doc> } & Data>
		: never
	: never
