// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { _set } from './set'

describe('set', () => {
	it('works', () => {
		expect.hasAssertions()

		const obj = { a: 1, c: {} }
		_set(obj, 'a', 2)

		expect(obj.a).toBe(2)

		// @ts-expect-error wrong type
		;() => _set(obj, 'a', 'test')
		// expect(obj.a).toBe('test')

		_set(obj, ['a', 222])

		expect(obj.a).toBe(222)

		// @ts-expect-error wrong type
		;() => _set(obj, ['a', 'test' as const])

		_set(obj, 'b', 'b')

		// @ts-expect-error b does not exist
		expect(obj.b).toBe('b')

		expect(() => _set(obj, ['a', 'aa'], 99)).toThrow('property not present')

		// @ts-expect-error path does not exist
		expect(() => _set(obj, ['c', 'cc', 'ccc'], 123)).toThrow(
			'property not present',
		)
	})
})
