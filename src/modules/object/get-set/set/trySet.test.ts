/* eslint-disable max-statements */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
import { trySet } from './trySet'

describe('trySet', () => {
	it('works', () => {
		expect.hasAssertions()

		const obj = { a: 1, c: {} }
		trySet(obj, 'a', 2)
		expect(obj.a).toBe(2)

		// @ts-expect-error wrong type
		;() => trySet(obj, 'a', 'test')

		trySet(obj, ['a', 222])
		expect(obj.a).toBe(222)

		// @ts-expect-error wrong type
		;() => trySet(obj, ['a', 'test'])

		trySet(obj, 'b', 'b')
		// @ts-expect-error b does not exist
		expect(obj.b).toBe('b')

		expect(() => trySet(obj, ['a', 'aa'], 99)).toThrow('property not present')

		// @ts-expect-error path does not exist
		expect(() => trySet(obj, ['c', 'cc', 'ccc'], 123)).toThrow(
			'property not present'
		)
	})
})
