/* eslint-disable no-undefined */
import { getProperty_ } from './getProperty_'

describe('getProperty', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(getProperty_({ a: 0 }, 'a')).toBe(0)
		expect(getProperty_({} as { a?: number }, 'a')).toBeUndefined()

		expect(getProperty_(undefined as undefined | { a?: number }, 'a')).toBeUndefined()

		// @ts-expect-error __proto__ does not exist
		expect(() => getProperty_({ a: 1 }, '__proto__')).toThrow('pollution')

		// @ts-expect-error __proto__ does not exist
		expect(() => getProperty_({ a: 1 }, 'constructor')).toThrow('pollution')
	})
})
