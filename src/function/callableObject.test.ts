/* eslint-disable no-magic-numbers */
import { callableObject } from './callableObject'

describe('callableObject', () => {
	it('works', () => {
		expect.hasAssertions()

		const a = callableObject({ a: 1 }, (n: number) => 2 * n)
		expect(a.a).toBe(1)
		expect(a(2)).toBe(4)
	})
})
