/* eslint-disable no-magic-numbers */
import { Assert } from '../../../../bdd'
import { IsIdentical } from '../../../../../IsEqual'
import { nest } from './nest'

describe('Nest', () => {
	it('works', () => {
		expect.hasAssertions()

		const a = nest(123, [] as const)
		expect(a).toBe(123)
		Assert<IsIdentical<typeof a, 123>>()

		const x = nest(123, ['a', 'b', 3] as const)
		expect(x).toStrictEqual({ a: { b: { 3: 123 } } })
		Assert<IsIdentical<typeof x, { a: { b: { [3]: 123 } } }>>()
	})
})
