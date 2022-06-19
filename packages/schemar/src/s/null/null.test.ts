import { IsIdentical } from '@voltiso/ts-util'
import { Assert } from '@voltiso/ts-util/bdd'
import * as s from '..'
import { GetOutputType } from '../../GetType'

describe('null', () => {
	it('simple', () => {
		expect.hasAssertions()

		type A = GetOutputType<typeof s.null>
		Assert<IsIdentical<A, null>>()

		expect(s.null.extends(s.null)).toBeTruthy()
		expect(s.null.extends(null)).toBeTruthy()

		expect(s.null.extends(s.number)).toBeFalsy()
		expect(s.null.extends(s.unknown)).toBeTruthy()
	})
})
