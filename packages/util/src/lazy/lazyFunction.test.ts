// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '_'

import { areArrowFunctionsTranspiled } from '~/misc'

import { lazyFunction } from './lazyFunction'

describe('lazyFunction', () => {
	it('arrow functions should not be transpiled', () => {
		expect.hasAssertions()

		expect(areArrowFunctionsTranspiled).toBeFalsy()
	})

	it('typeof', () => {
		expect.hasAssertions()

		const a = () => 123

		const b = lazyFunction(() => a)

		expect(typeof b).toBe('function')
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('strict mode', () => {
	// 	expect.hasAssertions()

	// 	const isStrict = (function (this: unknown) {
	// 		return !this
	// 	})()

	// 	expect(isStrict).toBeTruthy()
	// })

	it('call (arrow)', () => {
		expect.hasAssertions()

		let called = false

		const a = () => 123

		Object.setPrototypeOf(a, {
			s: 'abc',
		})

		const b = lazyFunction(() => {
			called = true
			return a
		})

		expect(called).toBeFalsy()
		expect(b()).toBe(123)
		expect((b as any).s).toBe('abc')
		expect(called).toBeTruthy()

		expect(Object.getPrototypeOf(b)).toBe(Object.getPrototypeOf(a))

		Object.setPrototypeOf(a, { base: 222 })

		expect(Object.getPrototypeOf(b)).toBe(Object.getPrototypeOf(a))

		expect(Object.getOwnPropertyDescriptor(b, 'a')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'a'),
		)

		expect(Object.getOwnPropertyDescriptor(b, 'unknown')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'unknown'),
		)

		expect(Object.getOwnPropertyDescriptor(b, 'length')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'length'),
		)

		expect(Object.getOwnPropertyDescriptor(b, 'name')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'name'),
		)

		expect(Object.getOwnPropertyDescriptor(b, 'arguments')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'arguments'),
		)

		expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'prototype'),
		)

		expect(Object.getOwnPropertyDescriptors(b)).toStrictEqual(
			Object.getOwnPropertyDescriptors(a),
		)

		expect(Object.getOwnPropertyNames(b)).toStrictEqual(
			Object.getOwnPropertyNames(a),
		)

		expect(Object.getOwnPropertySymbols(b)).toStrictEqual(
			Object.getOwnPropertySymbols(a),
		)
	})

	it('call (non-arrow)', () => {
		expect.hasAssertions()

		let called = false

		function a() {
			return 123
		}

		Object.setPrototypeOf(a, {
			s: 'abc',
		})

		const b = lazyFunction(function () {
			called = true
			return a
		})

		expect(called).toBeFalsy()
		expect(b()).toBe(123)
		expect((b as any).s).toBe('abc')
		expect(called).toBeTruthy()

		expect(Object.getPrototypeOf(b)).toBe(Object.getPrototypeOf(a))

		Object.setPrototypeOf(a, { base: 222 })

		expect(Object.getPrototypeOf(b)).toBe(Object.getPrototypeOf(a))

		expect(Object.getOwnPropertyDescriptor(b, 'a')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'a'),
		)

		expect(Object.getOwnPropertyDescriptor(b, 'unknown')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'unknown'),
		)

		expect(Object.getOwnPropertyDescriptor(b, 'length')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'length'),
		)

		expect(Object.getOwnPropertyDescriptor(b, 'name')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'name'),
		)

		const expected = Object.getOwnPropertyDescriptor(a, 'arguments')
		$fastAssert(expected)
		delete expected.configurable

		expect(Object.getOwnPropertyDescriptor(b, 'arguments')).toMatchObject(
			expected,
		)

		if (areArrowFunctionsTranspiled) {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toStrictEqual(
				Object.getOwnPropertyDescriptor(a, 'prototype'),
			)
		} else {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toStrictEqual({
				...Object.getOwnPropertyDescriptor(a, 'prototype'),
				configurable: true,
			})
		}

		if (areArrowFunctionsTranspiled) {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(Object.getOwnPropertyDescriptors(b)).toStrictEqual(
				Object.getOwnPropertyDescriptors(a),
			)
		} else {
			const expected = Object.getOwnPropertyDescriptors(a)

			// eslint-disable-next-line jest/no-conditional-expect
			expect(Object.getOwnPropertyDescriptors(b)).toMatchObject({
				...expected,

				arguments: {
					...expected['arguments'],
					// eslint-disable-next-line jest/no-conditional-expect
					configurable: expect.any(Boolean),
				},

				caller: {
					...expected['caller'],
					// eslint-disable-next-line jest/no-conditional-expect
					configurable: expect.any(Boolean),
				},

				prototype: {
					...expected['prototype'],
					// eslint-disable-next-line jest/no-conditional-expect
					configurable: expect.any(Boolean),
				},
			})
		}

		expect(Object.getOwnPropertyNames(b)).toStrictEqual(
			Object.getOwnPropertyNames(a),
		)

		expect(Object.getOwnPropertySymbols(b)).toStrictEqual(
			Object.getOwnPropertySymbols(a),
		)
	})

	it('get (callable)', () => {
		expect.hasAssertions()

		let called = false

		const x = lazyFunction(() => {
			called = true

			function f() {
				return 123
			}
			Object.setPrototypeOf(f, {
				s: 'abc',
			})
			return f
		}) as any

		expect(called).toBeFalsy()
		expect(x.s).toBe('abc')
		expect(called).toBeTruthy()
	})

	// can't make it work with constructors unfortunately...

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('constructor', () => {
	// 	expect.hasAssertions()

	// 	class C {
	// 		constructor() {
	// 			return BoundCallable(this)
	// 		}

	// 		_CALL() {
	// 			return 123
	// 		}
	// 	}

	// 	const CC = lazy(() => C)

	// 	function FunA() {}
	// 	const FunB = () => {}
	// 	FunB.prototype = FunA.prototype

	// 	// @ts-ignore
	// 	const x = new FunB()

	// 	const cc = new CC()

	// 	expect(cc).toBeInstanceOf(C)
	// })
})
