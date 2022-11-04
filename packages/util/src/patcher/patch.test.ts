// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type'

import { incrementIt } from '.'
import type { DeleteIt } from './deleteIt'
import { deleteIt } from './deleteIt'
import { keepIt } from './keepIt'
import type { ApplyPatch } from './patch'
import { forcePatch, patch } from './patch'
import type { ReplaceIt } from './replaceIt'
import { replaceIt } from './replaceIt'
   
describe('patch', () => {
	it('generic', <X>() => {
		expect.assertions(0)

		// type A = ApplyPatch<X, PatchFor<X>>
		// Assert.is<A, X>()

		type B = ApplyPatch<X, ReplaceIt<X>>
		$Assert.is<B, X>()

		type C = ApplyPatch<X, DeleteIt>
		$Assert.is<C, undefined>()
	})

	it('works', () => {
		expect.hasAssertions()

		// @ts-expect-error 123 not assignable to null
		;() => patch(null, 123)

		const a = patch(null as null | 123, 123 as const)

		expect(a).toBe(123)

		$Assert<IsIdentical<typeof a, 123>>()

		// @ts-expect-error 123 not assignable to null
		;() => patch({ a: null, b: 0 }, { a: 123 })

		//
		;() => forcePatch({ a: null, b: 0 }, { a: 123 })

		const b = patch({ a: 0, b: 0 }, { a: 1 } as const)

		expect(b).toStrictEqual({ a: 1, b: 0 })

		$Assert<IsIdentical<typeof b, { readonly a: 1; b: number }>>()

		// @ts-expect-error `b` missing
		;() => patch({ a: 0, b: 0 }, replaceIt({ a: 1 as const }))

		//
		;() => forcePatch({ a: 0, b: 0 }, replaceIt({ a: 1 as const }))

		const c = patch(
			{ a: 0, b: 0 } as { a: number; b?: 0 },
			replaceIt({ a: 1 as const }),
		)

		expect(c).toStrictEqual({ a: 1 })

		type C = typeof c
		$Assert<IsIdentical<C, { a: 1 }>>()
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

		const a = { a: 0, b: 'bb' }
		const b = patch(a, { a: 0 })

		expect(b).toBe(a)

		const c = patch(a, replaceIt({ a: 0, b: 'bb' }))

		expect(c).toBe(a)
	})

	it('does not modify if not needed (replaceIt)', () => {
		expect.hasAssertions()

		const a = { a: 0, b: 'bb' }
		const b = patch(a, replaceIt({ a: 0, b: 'bb' }))

		expect(b).toBe(a)
	})

	it('does not modify if not needed (patchSet)', () => {
		expect.hasAssertions()

		const a = { a: 0, b: 'bb' }
		const b = patch(a, replaceIt({ a: 0, b: 'bb' }))

		expect(b).toBe(a)

		const c = patch(a, { a: 0, b: 'bb' }, { depth: 0 })

		expect(c).toBe(a)
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('does not modify if not needed (patchSet) - proto', () => {
	// 	expect.hasAssertions()

	// 	const a = { a: 0, b: 'bb' }
	// 	Object.setPrototypeOf(a, { c: 1 })
	// 	const b = patch(a, replaceIt({ a: 0, b: 'bb' }))

	// 	expect(b).toBe(a)
	// })

	it('patchUpdate', () => {
		expect.hasAssertions()

		const obj: any = { b: 9, a: { aa: { aaa: 'a' } } }

		const a = patch(obj, { a: { bb: 99 } }, { depth: 1 })

		expect(a).toStrictEqual({ b: 9, a: { bb: 99 } })

		const b = patch(obj, { a: { bb: 99 } })

		expect(b).toStrictEqual({ b: 9, a: { aa: { aaa: 'a' }, bb: 99 } })

		const c = patch(123, 234 as const, { depth: 1 })

		expect(c).toBe(234)

		// @ts-expect-error `a` is required
		;() => patch({ a: 1 }, { a: deleteIt }, { depth: 1 })

		const d = patch(
			{ a: 1, b: 2 } as { a?: number },
			{ a: deleteIt },
			{ depth: 1 },
		)

		expect(d).toStrictEqual({ b: 2 })

		const e = patch({ a: 1, b: 2 }, { a: keepIt }, { depth: 1 })

		expect(e).toStrictEqual({ a: 1, b: 2 })

		$Assert<IsIdentical<typeof c, 234>>()
	})

	it('patchUpdate boolean', () => {
		expect.hasAssertions()

		const obj: any = { a: true }
		const b = patch(obj, { a: false }, { depth: 1 })

		expect(b).toStrictEqual({ a: false })
	})

	it('increment', () => {
		const obj = { a: { b: 123 } }

		expect(patch(obj, { a: { b: incrementIt(10) } })).toStrictEqual({
			a: { b: 133 },
		})
	})
})
