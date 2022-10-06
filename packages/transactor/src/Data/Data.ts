// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $_ } from '@voltiso/util'

import type { DocLike, IDoc } from '~/Doc'
import type { DocRefLike } from '~/Ref'

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

// type TDataDef = DataRecord // & TData

/** @inline */
export type WithId<Data, Doc extends DocLike = IDoc> = $_<
	{ id: Id<Doc> } & Data
>

// export type DataWithId<
// 	F extends IntrinsicFields = IntrinsicFields,
// 	I extends Id = Id,
// > = 'id' extends keyof OmitSignatures<F> ? never : _<{ readonly id: I } & F>

// export type DataWithoutId<F extends DefaultFields = DefaultFields> =
// 	F extends any ? _<{ readonly id?: never } & F> : never

// export type DataWithoutId<F extends DefaultFields = DefaultFields> =
// 	'id' extends keyof OmitSignatures<F> ? never : _<{ readonly id?: never } & F>

// export type Data<
// 	F extends object = DefaultFields,
// 	I extends Id = Id,
// > = 'id' extends keyof OmitSignatures<F> ? never : _<{ readonly id?: I } & F>
