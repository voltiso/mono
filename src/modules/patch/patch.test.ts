/* eslint-disable max-statements */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from '../../IsEqual'
import { Assert } from '../bdd'
import { DeleteIt } from './deleteIt'
import { ApplyPatch, forcePatch, patch } from './patch'
import { ReplaceIt, replaceIt } from './replaceIt'

describe('patch', () => {
	it('generic', <X>() => {
		expect.assertions(0)

		// type A = ApplyPatch<X, PatchFor<X>>
		// Assert.is<A, X>()

		type B = ApplyPatch<X, ReplaceIt<X>>
		Assert.is<B, X>()

		type C = ApplyPatch<X, DeleteIt>
		Assert.is<C, undefined>()
	})

	it('works', () => {
		expect.hasAssertions()

		// @ts-expect-error 123 not assignable to null
		;() => patch(null, 123)

		const a = patch(null as null | 123, 123 as const)
		expect(a).toBe(123)
		Assert<IsIdentical<typeof a, 123>>()

		// @ts-expect-error 123 not assignable to null
		;() => patch({ a: null, b: 0 }, { a: 123 })

		//
		;() => forcePatch({ a: null, b: 0 }, { a: 123 })

		const b = patch({ a: 0, b: 0 }, { a: 1 } as const)
		expect(b).toStrictEqual({ a: 1, b: 0 })
		Assert<IsIdentical<typeof b, { a: 1; b: number }>>()

		// @ts-expect-error `b` missing
		;() => patch({ a: 0, b: 0 }, replaceIt({ a: 1 as const }))

		//
		;() => forcePatch({ a: 0, b: 0 }, replaceIt({ a: 1 as const }))

		const c = patch(
			{ a: 0, b: 0 } as { a: number; b?: 0 },
			replaceIt({ a: 1 as const })
		)
		expect(c).toStrictEqual({ a: 1 })
		type C = typeof c
		Assert<IsIdentical<C, { a: 1 }>>()
	})

	it('does not change original data (simple)', () => {
		expect.hasAssertions()

		const a = { a: 0 }
		const originalA = a

		const b = patch(a, { a: 1 })

		expect(b).toStrictEqual({ a: 1 })
		expect(a).toStrictEqual({ a: 0 })

		expect(a).toBe(originalA)
	})

	it('does not modify if not needed (simple)', () => {
		expect.hasAssertions()

		const a = { a: 0 }
		const b = patch(a, { a: 0 })
		expect(b).toBe(a)
	})
})
