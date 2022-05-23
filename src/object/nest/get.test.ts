import { get } from './get'

describe('get', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(get({ a: 0 }, 'a')).toBe(0)

		// @ts-expect-error __proto__ does not exist
		expect(() => get({ a: 1 }, '__proto__')).toThrow('pollution')

		// @ts-expect-error __proto__ does not exist
		expect(() => get({ a: 1 }, 'constructor')).toThrow('pollution')
	})
})
