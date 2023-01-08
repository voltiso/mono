// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'

import { immutabilize } from './immutabilize'

describe('immutabilize', function () {
	it('should work with arrays', function () {
		expect.hasAssertions()

		const arr = immutabilize([1, 2, 3])

		expect(arr[1]).toBe(2)
		expect(arr).toHaveLength(3)
		expect(() => {
			arr[0] = 2
		}).toThrow('immutable')
	})

	it('should work with nested arrays', function () {
		expect.hasAssertions()

		const arr = immutabilize([[1], [2], [3, 4]])

		expect(arr[2]?.[0]).toBe(3)
		expect(() => {
			$assert(arr[2])
			arr[2][0] = 2
		}).toThrow('immutable')
	})

	it('should work with null', function () {
		expect.hasAssertions()

		const arr = immutabilize(null)

		expect(arr).toBeNull()
	})

	it('should work with objects', function () {
		expect.hasAssertions()

		const arr = immutabilize({ a: 123 })

		expect(arr.a).toBe(123)
		expect(() => {
			arr.a = 234
		}).toThrow('immutable')
	})

	it('should work with nested objects', function () {
		expect.hasAssertions()

		const arr = immutabilize({ a: { aa: 123 } })

		expect(arr.a.aa).toBe(123)
		expect(() => {
			arr.a.aa = 234
		}).toThrow('immutable')
	})

	it('should support custom error message', function () {
		expect.hasAssertions()

		const arr = immutabilize({ a: { aa: 123 } }, 'testWarn')

		expect(arr.a.aa).toBe(123)
		expect(() => {
			arr.a.aa = 234
		}).toThrow('testWarn')
	})

	it('should stringify', function () {
		expect.hasAssertions()

		const obj = immutabilize({ a: { aa: 123 } })
		const json = JSON.stringify(obj)

		expect(json).toBe('{"a":{"aa":123}}')
	})

	it('should not be inherited', function () {
		expect.hasAssertions()

		const proto = immutabilize({ a: { aa: 123 } })
		const derived: Record<string, unknown> = { __proto__: proto }

		derived['x'] = 99

		expect(derived['x']).toBe(99)
	})

	it('should not hack internal fields', function () {
		expect.hasAssertions()

		const proto = immutabilize({ a: { aa: 123 } })
		const derived = { __proto__: proto }

		expect(Object.getPrototypeOf(derived)).toBe(proto)
	})

	it('should work with symbols', function () {
		expect.hasAssertions()

		const symbol = Symbol('test')
		const obj = immutabilize({ [symbol]: 123 })

		expect(() => (obj[symbol] = 234)).toThrow('immutable')
		expect(obj[symbol]).toBe(123)
	})
})
