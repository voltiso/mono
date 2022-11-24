// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Output_ } from '@voltiso/schemar.types'

import { sTimestamp } from './sTimestamp'

export const sAggregateTargetEntry = s.object({
	value: s.any.optional, // s.unknown.Narrow<NestedData>(),
	numSources: s.number.default(0),
})

export type AggregateTargetEntry =
	/** @inline */ typeof sAggregateTargetEntry.Output

export const sVoltisoEntry = s.object({
	numRefs: s.number.default(0),

	aggregateTarget: s.object.plain
		.index(s.string, sAggregateTargetEntry)
		.default({}),

	aggregateSource: s.record(s.string, s.record(s.string, true)).default({}),

	migrations: s
		.record(s.string, {
			migratedAt: sTimestamp,
		})
		.default({}),
}).simple
// .default({}) // ! do not export schemas that apply defaults

export type VoltisoEntry = /** @inline */ Output_<typeof sVoltisoEntry>

// export interface VoltisoEntry {
// 	numRefs: number
// 	aggregateTarget: {}
// 	aggregateSource: {}
// }

export const sIntrinsicFields = s.infer({
	__voltiso: sVoltisoEntry,
})

export type IntrinsicFieldsSchema = typeof sIntrinsicFields.simple
export type DeepPartialIntrinsicFieldsSchema =
	typeof sIntrinsicFields.deepPartial.simple

export type IntrinsicFields = /** @inline */ Output_<typeof sIntrinsicFields>
// export type PartialIntrinsicFields = /** @inline */ Partial<IntrinsicFields>
