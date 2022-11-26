// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Output_ } from '@voltiso/schemar.types'

import { sVoltisoEntry } from './sVoltisoEntry'

export const sIntrinsicFields = s.infer({
	__voltiso: sVoltisoEntry,
})

export type IntrinsicFieldsSchema = typeof sIntrinsicFields.simple
export type DeepPartialIntrinsicFieldsSchema =
	typeof sIntrinsicFields.deepPartial.simple

export type IntrinsicFields = /** @inline */ Output_<typeof sIntrinsicFields>
// export type PartialIntrinsicFields = /** @inline */ Partial<IntrinsicFields>
