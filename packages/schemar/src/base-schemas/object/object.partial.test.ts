// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { Input, Output } from '~'
import * as s from '~'

describe('object', () => {
	it('partial', () => {
		expect.hasAssertions()

		const ss = s.infer({
			num: s.number.optional,
			str: s.string,
			bigint: s.bigint.strictOptional,

			nested: {
				a: 1 as const,
			},
		})

		//

		const sps = s.infer(ss).strictPartial

		expect(sps.validate({})).toStrictEqual({})
		expect(() => ss.validate({})).toThrow('.str')
		expect(() => sps.validate({ nested: {} })).toThrow('.nested.a')

		expect(sps.validate({ str: 'test', num: undefined })).toStrictEqual({
			str: 'test',
		})

		type SpsOut = Output<typeof sps>

		$Assert<
			IsIdentical<
				SpsOut,
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

		type SpsIn = Input<typeof sps>

		$Assert<
			IsIdentical<
				SpsIn,
				{
					num?: number | undefined // was non-strict `.optional` already
					str?: string
					bigint?: bigint
					nested?: {
						a: 1
					}
				}
			>
		>()

		//

		const ps = s.infer(ss).partial

		type PsOut = Output<typeof ps>

		$Assert<IsIdentical<PsOut, SpsOut>>()

		type PsIn = Input<typeof ps>

		$Assert<
			IsIdentical<
				PsIn,
				{
					num?: number | undefined
					str?: string | undefined
					bigint?: bigint | undefined

					nested?:
						| {
								a: 1
						  }
						| undefined
				}
			>
		>()

		expect(() => ps.validate(undefined)).toThrow(
			'should be object (got undefined)',
		)
	})

	it('deepPartial', () => {
		expect.hasAssertions()

		const ss = s.infer({
			numDef: s.number.default(() => 1 as const),
			num: s.number.optional,
			str: s.string.readonly,
			bigint: s.bigint.strictOptional,

			nested: {
				a: 1 as const,
			},
		})

		const ps = s.infer(ss).deepPartial

		expect(ps.validate({})).toStrictEqual({}) // removes defaults

		expect(ps.validate({ nested: {} })).toStrictEqual({
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

		type In = typeof ps.Input

		$Assert<
			IsIdentical<
				In,
				{
					num?: number | undefined
					numDef?: number | undefined
					readonly str?: string | undefined
					bigint?: bigint | undefined
					nested?:
						| {
								a?: 1 | undefined
						  }
						| undefined
				}
			>
		>()

		expect(() => ps.validate(undefined)).toThrow(
			'should be object (got undefined)',
		)

		//

		const sps = s.infer(ss).deepStrictPartial

		type SpsOut = typeof sps.Output

		$Assert<IsIdentical<SpsOut, typeof ps.Output>>()

		type SpsIn = typeof sps.Input

		$Assert<
			IsIdentical<
				SpsIn,
				{
					numDef?: number | undefined // !
					num?: number | undefined
					readonly str?: string
					bigint?: bigint

					nested?: {
						a?: 1
					}
				}
			>
		>()

		expect(() => ps.validate(undefined)).toThrow(
			'should be object (got undefined)',
		)
	})

	it('deepPartial - TDS', () => {
		expect.hasAssertions()

		const mySchema = s.object({
			auth: s.object({
				// uid: sUserId,

				// email: sEmail,
				emailVerified: s.boolean,

				customClaims: s.record(s.string, s.unknown),
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
