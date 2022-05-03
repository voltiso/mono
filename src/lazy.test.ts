/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
import { lazy } from './lazy'

describe('lazy', () => {
	it('get', () => {
		expect.hasAssertions()

		let called = false

		const x = lazy(() => {
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

		const x = lazy(() => {
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

		const x = lazy(() => {
			called = true
			function f() {
				return 123
			}
			Object.setPrototypeOf(f, {
				s: 'abc',
			})
			return f
		})

		expect(called).toBeFalsy()
		expect(x()).toBe(123)
		expect(called).toBeTruthy()
	})

	it('get (callable)', () => {
		expect.hasAssertions()

		let called = false

		const x = lazy(() => {
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
})
