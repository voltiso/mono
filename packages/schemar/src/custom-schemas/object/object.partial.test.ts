// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Output } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

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

		type Ps = Output<typeof ps>

		$Assert<
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

		type Out = typeof ps.Output

		$Assert<
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

	it('deepPartial - TDS', () => {
		expect.hasAssertions()

		const mySchema = s.object({
			auth: s.object({
				// uid: sUserId,

				// email: sEmail,
				emailVerified: s.boolean,

				customClaims: s.record,
				disabled: s.boolean,
				displayName: s.string.or(null),

				metadata: {
					creationTime: s.string, // sDateIsoString,
				},

				passwordHash: null,
				passwordSalt: null,
				// phoneNumber: sPhoneNumber.or(null),
				photoURL: s.string.or(null),
				providerData: s.array,
				tokensValidAfterTime: s.unknown,
			}),
		}).deepPartial

		expect(mySchema.validate({})).toStrictEqual({})
	})
})
