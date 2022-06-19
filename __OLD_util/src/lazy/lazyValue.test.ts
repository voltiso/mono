/* eslint-disable no-constructor-return */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
import { lazyValue } from './lazyValue'

describe('lazyValue', () => {
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

	it('call', () => {
		expect.hasAssertions()

		let called = false

		function a() {
			return 123
		}
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
			Object.getOwnPropertyDescriptor(a, 'a')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'unknown')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'unknown')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'length')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'length')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'name')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'name')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'arguments')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'arguments')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'prototype')
		)

		expect(Object.getOwnPropertyDescriptors(b)).toStrictEqual(
			Object.getOwnPropertyDescriptors(a)
		)
		expect(Object.getOwnPropertyNames(b)).toStrictEqual(
			Object.getOwnPropertyNames(a)
		)
		expect(Object.getOwnPropertySymbols(b)).toStrictEqual(
			Object.getOwnPropertySymbols(a)
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

		// eslint-disable-next-line func-names
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
			Object.getOwnPropertyDescriptor(a, 'a')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'unknown')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'unknown')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'length')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'length')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'name')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'name')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'arguments')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'arguments')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'prototype')
		)

		expect(Object.getOwnPropertyDescriptors(b)).toStrictEqual(
			Object.getOwnPropertyDescriptors(a)
		)
		expect(Object.getOwnPropertyNames(b)).toStrictEqual(
			Object.getOwnPropertyNames(a)
		)
		expect(Object.getOwnPropertySymbols(b)).toStrictEqual(
			Object.getOwnPropertySymbols(a)
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
			Object.getOwnPropertyDescriptor(a, 'a')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'unknown')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'unknown')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'length')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'length')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'name')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'name')
		)
		expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toStrictEqual(
			Object.getOwnPropertyDescriptor(a, 'prototype')
		)

		expect(Object.getOwnPropertyDescriptors(b)).toStrictEqual(
			Object.getOwnPropertyDescriptors(a)
		)
		expect(Object.getOwnPropertyNames(b)).toStrictEqual(
			Object.getOwnPropertyNames(a)
		)
		expect(Object.getOwnPropertySymbols(b)).toStrictEqual(
			Object.getOwnPropertySymbols(a)
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
