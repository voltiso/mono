/* eslint-disable no-undefined */
/* eslint-disable max-statements */
import { Assert } from '../../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { get } from './get'

describe('get', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(get(undefined as undefined | { a: number }, 'a')).toBeUndefined()

		expect(
			get(
				{ a: {} } as
					| undefined
					| {
							a?: { b?: { c?: number } }
					  },
				'a',
				'b',
				'c'
			)
		).toBeUndefined()

		expect(get({ a: 0 })).toStrictEqual({ a: 0 })
		expect(get({ a: 0 }, 'a')).toBe(0)

		expect(get({ a: { b: { c: 0 } } }, 'a', 'b')).toStrictEqual({ c: 0 })

		// @ts-expect-error __proto__
		expect(() => get({ a: 1 }, '__proto__')).toThrow('pollution')

		// @ts-expect-error constructor
		expect(() => get({ a: 1 }, 'constructor')).toThrow('pollution')

		// @ts-expect-error constructor
		expect(() => get({ a: 1 }, 'a', 'constructor')).toThrow('pollution')

		const a = { b: { c: { d: { e: 0 as const } } } }
		// @ts-expect-error path does not exist
		const aa = get(a, 'a' as const)
		// @ts-expect-error path does not exist
		const aa2 = get(a, ['a'] as const)
		expect(aa).toBeUndefined()
		expect(aa2).toBeUndefined()

		const aaa = get(a, 'b' as const, 'c' as const, 'd' as const)
		const aaa2 = get(a, ['b', 'c', 'd'] as const)
		expect(aaa).toStrictEqual({ e: 0 })
		expect(aaa2).toStrictEqual({ e: 0 })
		Assert<IsIdentical<typeof aaa, { e: 0 }>>()
		Assert<IsIdentical<typeof aaa2, { e: 0 }>>()
	})
})
