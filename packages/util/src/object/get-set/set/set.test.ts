// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { set } from './set'

describe('set', () => {
	it('works', () => {
		expect.hasAssertions()

		const obj = { a: 1, c: {} }
		set(obj, 'a', 2)

		expect(obj.a).toBe(2)

		// @ts-expect-error wrong type
		;() => set(obj, 'a', 'test')
		// expect(obj.a).toBe('test')

		set(obj, ['a', 222])

		expect(obj.a).toBe(222)

		// @ts-expect-error wrong type
		;() => set(obj, ['a', 'test' as const])

		set(obj, 'b', 'b')

		// @ts-expect-error b does not exist
		expect(obj.b).toBe('b')

		expect(() => set(obj, ['a', 'aa'], 99)).toThrow('property not present')

		// @ts-expect-error path does not exist
		expect(() => set(obj, ['c', 'cc', 'ccc'], 123)).toThrow(
			'property not present',
		)
	})
})
