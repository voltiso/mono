// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import { arraySetAddToIt, arraySetRemoveFromIt } from './arraySetUpdateIt'
import { deleteIt, deleteItIfPresent } from './deleteIt'
import { incrementIt } from './incrementIt'
import { keepIt } from './keepIt'
import { forcePatch, patch } from './patch'
import { replaceIt } from './replaceIt'

describe('patch', () => {
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

	it('array add', () => {
		expect.hasAssertions()

		const a = { arr: ['a', 'b', 1] }

		const b = patch(a, { arr: arraySetAddToIt<string | number>('b', 2) })

		expect(b).toStrictEqual({ arr: ['a', 'b', 1, 2] })
	})

	it('array remove', () => {
		expect.hasAssertions()

		const a = { arr: ['a', 'b', 1] }

		const b = patch(a, { arr: arraySetRemoveFromIt<string | number>('b', 2) })

		expect(b).toStrictEqual({ arr: ['a', 1] })
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

	it('replaces null', () => {
		expect.hasAssertions()

		const a = null as null | { b: 1 }
		const b = patch(a, { b: 1 })

		expect(b).toStrictEqual({ b: 1 })
	})

	it('strips nested replaceIt', () => {
		expect.hasAssertions()

		const a = null as null | { b: 1 }
		const b = patch(a, { b: replaceIt(1 as const) })

		expect(b).toStrictEqual({ b: 1 })
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

		const c = patch(123 as number, 234 as const, { depth: 1 })

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

	it('deleteIt - missing', () => {
		expect(() => forcePatch({ a: 1 }, { b: deleteIt })).toThrow(
			'forcePatch: cannot delete non-existing key b',
		)

		expect(forcePatch({ a: 1 }, { b: deleteItIfPresent })).toStrictEqual({
			a: 1,
		})

		expect(
			forcePatch({ a: 1 }, { b: { bb: deleteItIfPresent } }),
		).toStrictEqual({ a: 1, b: {} })
	})

	it('patchUpdate boolean', () => {
		expect.hasAssertions()

		const obj: any = { a: true }
		const b = patch(obj, { a: false }, { depth: 1 })

		expect(b).toStrictEqual({ a: false })
	})

	it('increment', () => {
		// number
		const obj = { a: { b: 123 } }

		expect(patch(obj, { a: { b: incrementIt(10) } })).toStrictEqual({
			a: { b: 133 },
		})
	})

	it('increment - bigint', () => {
		const obj2 = { a: { b: 123n } }

		expect(patch(obj2, { a: { b: incrementIt(10) } })).toStrictEqual({
			a: { b: 133n },
		})
	})

	it('increment - wrong type', () => {
		const obj = { a: 'test' }

		expect(() => patch(obj, { a: incrementIt(10) as never })).toThrow(
			'cannot increment non-number',
		)
	})

	it('increment - missing', () => {
		expect(() => patch({}, { a: incrementIt(10) as never })).toThrow(
			'cannot increment non-number', // TODO: better error message
		)
	})

	it('increment - missing - nested', () => {
		expect(() => patch({}, { a: { b: incrementIt(10) as never } })).toThrow(
			'found non-safe-to-strip sentinel incrementIt(10)',
		)
	})
})
