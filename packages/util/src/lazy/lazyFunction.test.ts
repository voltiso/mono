// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { areArrowFunctionsTranspiled } from '~/misc'

import { lazyFunction } from './lazyFunction'

// import { $fastAssert } from '_/$strip/$assert'

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

		// $fastAssert(Object.getOwnPropertyDescriptor(a, 'arguments'))

		Object.setPrototypeOf(a, {
			s: 'abc',
		})

		// biome-ignore lint/complexity/useArrowFunction: .
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
		// ! THIS DIFFERS IN CJS VS ESM
		// $fastAssert(expected)
		// delete expected.configurable

		// expect(Object.getOwnPropertyDescriptor(b, 'arguments')).toMatchObject(
		// 	expected,
		// )

		expect(expected).toBeUndefined()
		expect(Object.getOwnPropertyDescriptor(b, 'arguments')).toBeUndefined()
		// !

		if (areArrowFunctionsTranspiled) {
			expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toStrictEqual(
				Object.getOwnPropertyDescriptor(a, 'prototype'),
			)
		} else {
			expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toStrictEqual({
				...Object.getOwnPropertyDescriptor(a, 'prototype'),
				configurable: true,
			})
		}

		if (areArrowFunctionsTranspiled) {
			expect(Object.getOwnPropertyDescriptors(b)).toStrictEqual(
				Object.getOwnPropertyDescriptors(a),
			)
		} else {
			const expected = Object.getOwnPropertyDescriptors(a)

			expect(Object.getOwnPropertyDescriptors(b)).toMatchObject({
				...expected,

				// ! THIS DIFFERS IN CJS VS ESM
				// arguments: {
				// 	...expected['arguments'],
				// 	configurable: expect.any(Boolean),
				// },

				// caller: {
				// 	...expected['caller'],
				// 	configurable: expect.any(Boolean),
				// },
				// !

				prototype: {
					...expected['prototype'],

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

	// 	// @ts-expect-error
	// 	const x = new FunB()

	// 	const cc = new CC()

	// 	expect(cc).toBeInstanceOf(C)
	// })
})
