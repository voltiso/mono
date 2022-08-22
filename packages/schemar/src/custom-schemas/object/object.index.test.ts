// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import * as s from '~'

describe('object', () => {
	it('index signature', () => {
		expect.hasAssertions()

		const a = s
			.object({
				normalField: s.string,
			})
			.index(s.string, s.number)

		type AOut = typeof a.OutputType

		Assert<
			IsIdentical<
				AOut,
				{
					[k: string]: number
					// @ts-expect-error `normalField` does not match index signature
					normalField: string
				}
			>
		>()

		const good = {
			normalField: 'test',
			test: 8,
		}

		expect(a.validate(good)).toStrictEqual(good)

		const badValue = {
			normalField: 'test',
			test: 'badValue',
		}

		expect(() => a.validate(badValue)).toThrow('badValue')

		const badKey = {
			normalField: 'test',
			[Symbol('test')]: 444,
		}

		expect(() => a.validate(badKey)).toThrow('test')

		const badNormalField = {
			normalField: 123,
			test: 8,
		}

		expect(() => a.validate(badNormalField)).toThrow('123')
	})

	it('index signature - single argument', () => {
		expect.hasAssertions()

		const a = s
			.object({
				normalField: s.string,
			})
			.index(s.number.or(s.string))

		type AOut = typeof a.OutputType

		Assert<
			IsIdentical<
				AOut,
				{
					[k: keyof any]: number | string
					normalField: string
				}
			>
		>()

		const good = {
			normalField: 'test',
			test: 8,
		}

		expect(a.validate(good)).toStrictEqual(good)

		const badValue = {
			normalField: 'test',
			test: Symbol('badValue'),
		}

		expect(() => a.validate(badValue)).toThrow('badValue')
	})

	it('object.index', () => {
		expect.hasAssertions()

		const a = s.object.index(s.string, s.number)

		const good = {
			test: 8,
		}

		expect(a.validate(good)).toStrictEqual(good)

		const badValue = {
			test: 'badValue',
		}

		expect(() => a.validate(badValue)).toThrow('badValue')
	})
})
