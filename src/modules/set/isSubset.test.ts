/* eslint-disable no-magic-numbers */
import { isSubset } from './isSubset'

describe('isSubset', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(isSubset(new Set([1, 2, 3]), new Set([1, 2, 3, 4, 5]))).toBeTruthy()
		expect(isSubset(new Set([1, 2, 3, 0]), new Set([1, 2, 3, 4, 5]))).toBeFalsy()
	})
})
