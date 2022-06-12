/* eslint-disable no-magic-numbers */
import { callableObject } from './callableObject'

describe('callableObject', () => {
	it('works', () => {
		expect.hasAssertions()

		const a = callableObject({ a: 1 }, (n: number) => 2 * n)
		expect(a.a).toBe(1)
		expect(a(2)).toBe(4)
	})

	it('proxy', () => {
		expect.hasAssertions()

		const a = callableObject(
			new Proxy(
				{},
				{
					get(_t, p) {
						return p
					},
				}
			),
			(x: number) => 2 * x
		)

		expect(a(2)).toBe(4)
		// @ts-expect-error no type
		expect(a.test).not.toBe('test') // does not work!
	})
})
