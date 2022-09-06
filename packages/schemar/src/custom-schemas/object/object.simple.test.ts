// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, SimpleSchema } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import * as s from '~'

describe('object', () => {
	it('make simple - same Input/Output', () => {
		expect.assertions(0)

		const mySchema = s.schema({
			numDef: s.number,
			num: s.number,
			str: s.string,
			bigint: s.bigint,

			nested: {
				a: 1,
			},
		})

		const simpleSchema = mySchema.simple

		Assert<
			IsIdentical<
				typeof simpleSchema,
				SimpleSchema<{
					numDef: number
					str: string
					nested: {
						a: number
					}
					num: number
					bigint: bigint
				}>
			>
		>()
	})

	it('make simple - different Input/Output types', () => {
		expect.assertions(0)

		const mySchema = s.schema({
			numDef: s.number.default(1),
			num: s.number.optional,
			str: s.string,
			bigint: s.bigint.optional,

			nested: {
				a: 1,
			},
		})

		const simpleSchema = mySchema.simple

		Assert<
			IsIdentical<
				typeof simpleSchema,
				CustomSchema<{
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
