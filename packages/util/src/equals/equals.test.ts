// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { equals } from './equals'

describe('equals', () => {
	it('same-value-zero', () => {
		expect(equals(Number.NaN, Number.NaN)).toBeTruthy()
		expect(equals(0, Number.NaN)).toBeFalsy()

		expect(equals(+0, -0)).toBeTruthy()
		expect(equals(1, 2)).toBeFalsy()
	})

	it('object', () => {
		expect(equals({}, {})).toBeTruthy()
	})

	it('symbol keys', () => {
		const symbol = Symbol('test')

		expect(equals({ [symbol]: 1 }, { [symbol]: 2 })).toBeFalsy()
		expect(equals({ [symbol]: 1 }, { [symbol]: 1 })).toBeTruthy()
	})

	it('no proto', () => {
		const a = { key: 1 }
		const b = Object.setPrototypeOf({}, { key: 1 })

		expect(equals(a, b)).toBeFalsy()
	})

	it('array', () => {
		expect(equals([], [])).toBeTruthy()
		expect(equals([1, 2, { a: 1 }], [1, 2, { a: 1 }])).toBeTruthy()
	})

	it('date', () => {
		expect(equals(new Date('2020'), new Date('2020'))).toBeTruthy()
		expect(equals(new Date(2020), new Date(2020))).toBeTruthy()
		expect(equals(new Date(2020), new Date(2022))).toBeFalsy()
		expect(equals(new Date(0), new Date(0))).toBeTruthy()
	})

	describe('regex', () => {
		it('simple', () => {
			// eslint-disable-next-line regexp/require-unicode-regexp
			expect(equals(/test/g, /test/g)).toBeTruthy()
			// eslint-disable-next-line regexp/require-unicode-regexp
			expect(equals(/test/g, /test/gu)).toBeFalsy()
			// eslint-disable-next-line regexp/require-unicode-regexp
			expect(equals(/test/g, '/test/g')).toBeFalsy()
		})
	})

	describe('set', () => {
		it('true', () => {
			const a = new Set([1, 2, 3])
			const b = new Set([3, 2, 1])

			expect(equals(a, b)).toBeTruthy()
		})

		it('false', () => {
			const a = new Set([1, 2, 3])
			const b = new Set([3, 2, 1, 5])

			expect(equals(a, b)).toBeFalsy()
		})

		it('false - extra keys', () => {
			const a = new Set([1, 2, 3])
			const b = new Set([3, 2, 1])

			;(a as any).bonus = 123

			expect(equals(a, b)).toBeFalsy()
		})
	})

	describe('map', () => {
		it('true', () => {
			const a = new Map([
				[1, 'a'],
				[2, 'b'],
				[3, 'c'],
			])

			const b = new Map([
				[3, 'c'],
				[2, 'b'],
				[1, 'a'],
			])

			expect(equals(a, b)).toBeTruthy()
		})

		it('false', () => {
			const a = new Map([
				[1, 'a'],
				[2, 'b'],
				[3, 'c'],
			])

			const b = new Map([
				[3, 'c'],
				[2, 'bb'],
				[1, 'a'],
			])

			expect(equals(a, b)).toBeFalsy()
		})
	})
})
