// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OutputType } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import * as s from '~'

describe('object', () => {
	it('partial', () => {
		expect.hasAssertions()

		const ss = s.infer({
			num: s.number.optional,
			str: s.string,
			bigint: s.bigint.optional,

			nested: {
				a: 1 as const,
			},
		})

		const ps = s.infer(ss).strictPartial

		expect(ps.validate({})).toStrictEqual({})
		expect(() => ss.validate({})).toThrow('.str')
		expect(() => ps.validate({ nested: {} })).toThrow('.nested.a')

		expect(ps.validate({ str: 'test', num: undefined })).toStrictEqual({
			str: 'test',
		})

		type Ps = OutputType<typeof ps>

		Assert<
			IsIdentical<
				Ps,
				{
					num?: number
					str?: string
					bigint?: bigint
					nested?: {
						a: 1
					}
				}
			>
		>()
	})

	it('deepPartial', () => {
		expect.hasAssertions()

		const ss = s.infer({
			numDef: s.number.default(() => 1 as const),
			num: s.number.optional,
			str: s.string.readonly.simple,
			bigint: s.bigint.optional,

			nested: {
				a: 1 as const,
			},
		})

		const ps = s.infer(ss).deepPartial

		expect(ps.validate({})).toStrictEqual({ numDef: 1 })
		expect(ps.validate({ nested: {} })).toStrictEqual({
			numDef: 1,
			nested: {},
		})
		expect(() => ss.validate({})).toThrow('.str')

		type Out = typeof ps.OutputType

		Assert<
			IsIdentical<
				Out,
				{
					num?: number
					numDef?: number
					readonly str?: string
					bigint?: bigint
					nested?: {
						a?: 1
					}
				}
			>
		>()
	})
})
