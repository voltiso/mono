/* eslint-disable no-undefined */
import { isMap } from './isMap'

describe('isMap', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(isMap(new Set())).toBeFalsy()
		expect(isMap(new Map())).toBeTruthy()
		expect(isMap(new Date())).toBeFalsy()

		expect(isMap({})).toBeFalsy()
		expect(isMap(null)).toBeFalsy()
		expect(isMap(undefined)).toBeFalsy()
	})
})
