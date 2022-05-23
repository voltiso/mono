import { Assert } from '../../bdd'
import { IsIdentical } from '../../IsEqual'
import { getPath, GetPath } from './getPath'

describe('getPath', () => {
	it('works (static)', () => {
		expect.assertions(0)

		type A = GetPath<{ a: { b: { c: 0 } } }, []>
		Assert<IsIdentical<A, { a: { b: { c: 0 } } }>>()

		type B = GetPath<{ a: { b: { c: 0 } } }, ['a']>
		Assert<IsIdentical<B, { b: { c: 0 } }>>()

		type C = GetPath<{ a: { b: { c: 0 } } }, ['a', 'b', 'c']>
		Assert<IsIdentical<C, 0>>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(getPath({ a: 0 }, [])).toStrictEqual({ a: 0 })
		expect(getPath({ a: 0 }, ['a'])).toBe(0)

		expect(getPath({ a: { b: { c: 0 } } }, ['a', 'b'])).toStrictEqual({ c: 0 })

		// @ts-expect-error __proto__
		expect(() => getPath({ a: 1 }, ['__proto__'])).toThrow('pollution')

		// @ts-expect-error constructor
		expect(() => getPath({ a: 1 }, ['constructor'])).toThrow('pollution')
	})
})
