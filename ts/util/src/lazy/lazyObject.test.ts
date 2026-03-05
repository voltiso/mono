// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { areArrowFunctionsTranspiled } from '~/misc/areArrowFunctionsTranspiled'

import { lazyObject } from './lazyObject'

describe('lazyObject', () => {
	it('typeof', () => {
		expect.hasAssertions()

		const a = { a: 1 }

		const b = lazyObject(() => a)

		expect(typeof b).toBe('object')
	})

	it('get', () => {
		expect.hasAssertions()

		let called = false

		const x = lazyObject(() => {
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

		const x = lazyObject(() => {
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

	it('instanceof', () => {
		expect.hasAssertions()

		class C {}
		const c = lazyObject(() => new C())

		expect(c).toBeInstanceOf(C)
	})

	it('plain object', () => {
		expect.hasAssertions()

		const s = Symbol('b')

		const a = {
			a: 1,
			[s]: 2,
		}
		const b = lazyObject(() => a)

		expect(b.a).toBe(a.a)

		b.a = 1_111

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
			expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toMatchObject({
				configurable: false,
				enumerable: false,
				value: {},
				writable: true,
			})
		} else {
			expect(Object.getOwnPropertyDescriptor(b, 'prototype')).toStrictEqual(
				Object.getOwnPropertyDescriptor(a, 'prototype'),
			)
		}

		if (areArrowFunctionsTranspiled) {
			expect(Object.getOwnPropertyDescriptors(b)).toMatchObject(
				Object.getOwnPropertyDescriptors(a),
			)
		} else {
			expect(Object.getOwnPropertyDescriptors(b)).toStrictEqual(
				Object.getOwnPropertyDescriptors(a),
			)
		}

		if (areArrowFunctionsTranspiled) {
			expect(Object.getOwnPropertyNames(b)).toStrictEqual(
				expect.arrayContaining(Object.getOwnPropertyNames(a)),
			)
		} else {
			expect(Object.getOwnPropertyDescriptors(b)).toStrictEqual(
				Object.getOwnPropertyDescriptors(a),
			)
		}

		expect(Object.getOwnPropertySymbols(b)).toStrictEqual(
			Object.getOwnPropertySymbols(a),
		)
	})
})
