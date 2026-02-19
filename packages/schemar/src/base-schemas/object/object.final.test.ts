// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('object', () => {
	it('make final - same Input/Output', () => {
		const mySchema = s.schema({
			numDef: s.number,
			num: s.number,
			str: s.string,
			bigint: s.bigint,

			nested: {
				a: 1,
			},
		})

		const finalSchema = mySchema.Final

		$Assert<
			IsIdentical<
				typeof finalSchema,
				s.Object<{
					numDef: number
					num: number
					str: string
					bigint: bigint
					nested: {
						a: number
					}
				}>
			>
		>()
	})

	it('make final - different Input/Output types', () => {
		const mySchema = s.schema({
			numDef: s.number.default(1),
			num: s.number.optional,
			str: s.string,
			bigint: s.bigint.optional,

			nested: {
				a: 1,
			},
		})

		const finalSchema = mySchema.Final

		$Assert<
			IsIdentical<
				typeof finalSchema,
				s.CustomObject<{
					Output: {
						numDef: number
						str: string
						nested: {
							a: number
						}
						num?: number
						bigint?: bigint
					}
					Input: {
						str: string
						nested: {
							a: number
						}
						numDef?: number | undefined
						num?: number | undefined
						bigint?: bigint | undefined
					}
				}>
			>
		>()
	})
})
