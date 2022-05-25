/* eslint-disable no-undefined */
import { getProperty } from './getProperty'

describe('getProperty', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(getProperty({ a: 0 }, 'a')).toBe(0)
		expect(getProperty({} as { a?: number }, 'a')).toBeUndefined()

		expect(getProperty(undefined as undefined | { a?: number }, 'a')).toBeUndefined()

		// @ts-expect-error __proto__ does not exist
		expect(() => getProperty({ a: 1 }, '__proto__')).toThrow('pollution')

		// @ts-expect-error __proto__ does not exist
		expect(() => getProperty({ a: 1 }, 'constructor')).toThrow('pollution')
	})
})
