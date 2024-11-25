// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { lazyConstructor } from '~/lazy/lazyConstructor'

import { isInstanceOf } from './isInstanceOf'

describe('isInstanceOf', () => {
	it('works', () => {
		expect.hasAssertions()

		const date = new Date(2_022)

		expect(isInstanceOf(date, Date)).toBeTruthy()
		expect(isInstanceOf(date, Object)).toBeTruthy()
		expect(isInstanceOf(date, Number)).toBeFalsy()
	})

	it('works with lazyConstructor', () => {
		expect.hasAssertions()

		const LazyDate = lazyConstructor(() => Date)

		const date = new Date('2020')
		const lazyDate = new LazyDate('2020')

		expect(isInstanceOf(lazyDate, LazyDate)).toBeTruthy()
		expect(isInstanceOf(lazyDate, Date)).toBeTruthy()
		expect(isInstanceOf(date, Date)).toBeTruthy() // hacked! 😎
	})
})
