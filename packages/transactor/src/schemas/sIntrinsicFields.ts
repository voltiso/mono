// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Input_, Output_ } from '@voltiso/schemar.types'

import { sVoltisoEntry } from './sVoltisoEntry'

export const _sIntrinsicFields = s.infer({
	__voltiso: sVoltisoEntry,
})

export const sIntrinsicFields = _sIntrinsicFields
	.CastOutput<IntrinsicFields>()
	.CastInput<IntrinsicFields.Input>()

export interface IntrinsicFields extends Output_<typeof _sIntrinsicFields> {}

export namespace IntrinsicFields {
	export interface Input extends Input_<typeof _sIntrinsicFields> {}
}

//

export type IntrinsicFieldsSchema = typeof sIntrinsicFields.simple

// export type DeepPartialIntrinsicFieldsSchema =
// 	typeof sIntrinsicFields.deepPartial.simple
