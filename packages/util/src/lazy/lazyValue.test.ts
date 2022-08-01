// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '_/assert'

import { areArrowFunctionsTranspiled } from '~/misc'

import { lazyValue } from './lazyValue'

describe('lazyValue', () => {
	it('arrow functions should not be transpiled', () => {
		expect.hasAssertions()

		expect(areArrowFunctionsTranspiled).toBeFalsy()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('strict mode', () => {
	// 	expect.hasAssertions()

	// 	const isStrict = (function (this: unknown) {
	// 		return !this
	// 	})()

	// 	expect(isStrict).toBeTruthy()
	// })

	it('get', () => {
		expect.hasAssertions()

		let called = false

		const x = lazyValue(() => {
			called = true
			return { a: 1 }
		})

		expect(called).toBeFalsy()
		expect(x.a).toBe(1)
		expect(called).toBeTruthy()
	})

	it('set', () => {
		expect.hasAssertions()

		let called = false

		const x = lazyValue(() => {
			called = true
			return { a: 1 } as { a: number; b: number }
		})

		expect(called).toBeFalsy()

		x.a = 2

		expect(called).toBeTruthy()

		x.b = 2

		expect(x.a).toBe(2)
		expect(x.b).toBe(2)
		expect(called).toBeTruthy()
	})

	it('call (arrow)', () => {
		expect.hasAssertions()

		let called = false

		const a = () => 123

		Object.setPrototypeOf(a, {
			s: 'abc',
		})

		const b = lazyValue(() => {
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

		const b = lazyValue(function () {
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
		assert(expected)
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
					configurable: expect.any(Boolean),
				},

				caller: {
					...expected['caller'],
					configurable: expect.any(Boolean),
				},

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

		const x = lazyValue(() => {
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

	it('instanceof', () => {
		expect.hasAssertions()

		class C {}
		const c = lazyValue(() => new C())

		expect(c).toBeInstanceOf(C)
	})

	it('plain object', () => {
		expect.hasAssertions()

		const s = Symbol('b')

		const a = {
			a: 1,
			[s]: 2,
		}
		const b = lazyValue(() => a)

		expect(b.a).toBe(a.a)

		b.a = 1111

		expect(b.a).toBe(a.a)

		expect(Object.getPrototypeOf(b)).toBe(Object.getPrototypeOf(a))

		Object.setPrototypeOf(a, { base: 222 })

		expect(Object.getPrototypeOf(b)).toBe(Object.getPrototypeOf(a))

		expect(b.a).toBe(a.a)
		expect(b[s]).toBe(a[s])

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

		if (areArrowFunctionsTranspiled) {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toMatchObject({
				configurable: false,
				enumerable: false,
				value: {},
				writable: true,
			})
		} else {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toStrictEqual(
				Object.getOwnPropertyDescriptor(a, 'prototype'),
			)
		}

		if (areArrowFunctionsTranspiled) {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(Object.getOwnPropertyDescriptors(b)).toMatchObject(
				Object.getOwnPropertyDescriptors(a),
			)
		} else {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(Object.getOwnPropertyDescriptors(b)).toStrictEqual(
				Object.getOwnPropertyDescriptors(a),
			)
		}

		if (areArrowFunctionsTranspiled) {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(Object.getOwnPropertyNames(b)).toStrictEqual(
				expect.arrayContaining(Object.getOwnPropertyNames(a)),
			)
		} else {
			// eslint-disable-next-line jest/no-conditional-expect
			expect(Object.getOwnPropertyDescriptors(b)).toStrictEqual(
				Object.getOwnPropertyDescriptors(a),
			)
		}

		expect(Object.getOwnPropertySymbols(b)).toStrictEqual(
			Object.getOwnPropertySymbols(a),
		)
	})

	// can't make it work with constructors unfortunately...

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('constructor', () => {
	// 	expect.hasAssertions()

	// 	class C {
	// 		constructor() {
	// 			return callableInstance(this)
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
