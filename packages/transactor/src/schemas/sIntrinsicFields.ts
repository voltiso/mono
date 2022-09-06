// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Type } from '@voltiso/schemar.types'

export const sVoltisoEntry = s
	.object({
		numRefs: s.number.default(0),

		aggregateTarget: s
			.record(s.string, {
				value: s.any,
				numSources: s.number,
			})
			.default({}),

		aggregateSource: s.record(s.string, s.literal(true)).default({}),
	})
	.default({})

export const sIntrinsicFields = s.infer({
	__voltiso: sVoltisoEntry,
})

export type IntrinsicFieldsSchema = typeof sIntrinsicFields.simple
export type DeepPartialIntrinsicFieldsSchema =
	typeof sIntrinsicFields.deepPartial.simple

export type IntrinsicFields = /** @inline */ Type<typeof sIntrinsicFields>
export type PartialIntrinsicFields = Partial<IntrinsicFields>
