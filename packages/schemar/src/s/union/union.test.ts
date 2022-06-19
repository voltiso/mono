import { IsIdentical } from '@voltiso/ts-util'
import { Assert } from '@voltiso/ts-util/bdd'
import { GetInputType, GetOutputType } from '../../GetType'
import * as s from '..'

describe('union', () => {
	it('works', () => {
		expect.hasAssertions()

		const sn = s.union(s.string, s.number)
		type Sn = GetOutputType<typeof sn>
		Assert<IsIdentical<Sn, string | number>>()
		Assert<IsIdentical<GetInputType<typeof sn>, string | number>>()

		const sn2 = s.string.or(s.number)
		type Sn2 = GetOutputType<typeof sn2>
		Assert<IsIdentical<Sn2, string | number>>()
		Assert<IsIdentical<GetInputType<typeof sn2>, string | number>>()

		const snb = s.union(sn, s.bigint)
		type Snb = GetOutputType<typeof snb>
		Assert<IsIdentical<Snb, string | number | bigint>>()
		Assert<IsIdentical<GetInputType<typeof snb>, string | number | bigint>>()

		expect(s.string.extends(s.string.or(s.number))).toBeTruthy()
		expect(s.string.or(s.number).extends(s.string.or(s.number))).toBeTruthy()
		expect(s.number.or(s.string).extends(s.string.or(s.number))).toBeTruthy()
		expect(s.string.or(s.number).extends(s.string)).toBeFalsy()

		expect(s.string.or(s.string).extends(s.string)).toBeTruthy()
		expect(s.string.or(s.string('asd')).extends(s.string)).toBeTruthy()
		expect(s.string('sdf').or(s.string('asd')).extends(s.string)).toBeTruthy()
	})
})
