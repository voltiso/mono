// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Type_ } from '@voltiso/schemar.types'

export const sVoltisoEntry = s.object({
	numRefs: s.number.default(0),

	aggregateTarget: s
		.object.plain.index(s.string, {
			value: s.any, // s.unknown.Narrow<NestedData>(),
			numSources: s.number,
		})
		.default({}),

	aggregateSource: s.record(s.string, s.record(s.string, true)).default({}),
})
// .default({}) // ! do not export schemas that apply defaults

export type VoltisoEntry = /** @inline */ Type_<typeof sVoltisoEntry>

export const sIntrinsicFields = s.infer({
	__voltiso: sVoltisoEntry,
})

export type IntrinsicFieldsSchema = typeof sIntrinsicFields.simple
export type DeepPartialIntrinsicFieldsSchema =
	typeof sIntrinsicFields.deepPartial.simple

export type IntrinsicFields = /** @inline */ Type_<typeof sIntrinsicFields>
// export type PartialIntrinsicFields = /** @inline */ Partial<IntrinsicFields>

export type IntrinsicFieldsLike = { __voltiso: any }
// export type PartialIntrinsicFieldsLike = { __voltiso?: any }
