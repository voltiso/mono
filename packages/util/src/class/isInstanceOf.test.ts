import { lazyConstructor } from '../index.js'
import { isInstanceOf } from './isInstanceOf.js'

describe('isInstanceOf', () => {
	it('works', () => {
		expect.hasAssertions()

		const date = new Date(2022)

		expect(isInstanceOf(date, Date)).toBeTruthy()
		expect(isInstanceOf(date, Object)).toBeTruthy()
		expect(isInstanceOf(date, Number)).toBeFalsy()
	})

	it('works with lazyConstructor', () => {
		expect.hasAssertions()

		const LazyDate = lazyConstructor(() => Date)

		const date = new Date('2022')
		const lazyDate = new LazyDate('2022')

		expect(isInstanceOf(lazyDate, LazyDate)).toBeTruthy()
		expect(isInstanceOf(lazyDate, Date)).toBeTruthy()
		expect(isInstanceOf(date, Date)).toBeTruthy() // hacked! 😎
	})
})
