// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, OmitSignatures } from '@voltiso/util'

import type { IRef } from '~/Ref'
import type { IntrinsicFields } from '~/schemas'

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

type DefaultFields = IntrinsicFields

export type DataWithId<
	F extends DefaultFields = DefaultFields,
	I extends Id = Id,
> = 'id' extends keyof OmitSignatures<F> ? never : _<{ readonly id: I } & F>

export type DataWithoutId<F extends DefaultFields = DefaultFields> =
	'id' extends keyof OmitSignatures<F> ? never : _<{ readonly id?: never } & F>

export type Data<
	F extends object = DefaultFields,
	I extends Id = Id,
> = 'id' extends keyof OmitSignatures<F> ? never : _<{ readonly id?: I } & F>
