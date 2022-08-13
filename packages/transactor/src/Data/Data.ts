// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'

import type { IDoc } from '~/Doc'
import type { IRef } from '~/Ref'

import type { Id } from './Id'

export type LeafData = boolean | string | number | null | Date | IRef

// NestedData
export type DataRecord = {
	[k: string]: NestedData
}
export const isNestedDataRecord = (x: NestedData): x is DataRecord =>
	x?.constructor === Object

export type NestedDataNoArray = DataRecord | LeafData
export type NestedData = NestedDataNoArray | NestedDataNoArray[] // array of arrays not possible

// type TDataDef = DataRecord // & TData

export type WithId<Data, Doc extends IDoc = IDoc> = _<Data & { id: Id<Doc> }>

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
