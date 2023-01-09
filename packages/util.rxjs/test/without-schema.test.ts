// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { CustomNestedSubject } from '~'
import { NestedSubject } from '~'

describe('NestedSubject', () => {
	it('delete root', () => {
		expect.hasAssertions()

		const data$ = new NestedSubject(undefined as unknown)
		$Assert<IsIdentical<typeof data$, NestedSubject<unknown>>>()

		expect(data$.value).toBeUndefined()

		data$.set(123)

		expect(data$.value).toBe(123)

		// @ts-expect-error root is non-optional
		data$.delete()

		expect(data$.maybeValue).toBeUndefined()

		expect(() => data$.value).toThrow(
			'.value called on NestedSubject without value',
		)
	})

	it('infer type from initial value', () => {
		const data$ = new NestedSubject({ a: 123 })
		$Assert<IsIdentical<typeof data$, NestedSubject<{ a: number }>>>()
	})

	it('works', () => {
		expect.hasAssertions()

		const data$ = new NestedSubject<{ a?: { b?: { c: number } } }>({ a: {} })

		$Assert<IsIdentical<typeof data$.delete, (() => void) | undefined>>()
		$Assert<IsIdentical<typeof data$.a.delete, () => void>>()

		expect(data$.exists).toBeTruthy()
		expect(data$.a.exists).toBeTruthy()
		expect(data$.a.b.exists).toBeFalsy()
		expect(data$.a.b.c.exists).toBeFalsy()

		/** Auto-remove options identical to defaults (cleaner editor support) */
		$Assert<
			IsIdentical<
				typeof data$.a.b.c,
				CustomNestedSubject<{
					Output: number
					Input: number
					IsAncestorOptional: true
				}>
			>
		>()

		let observedB: { c: number } | undefined
		let observedC: number | undefined

		let called = [] as string[]

		data$.a.b.subscribe(b => {
			observedB = b
			called.push('b')
		})

		data$.a.b.c.subscribe(c => {
			$Assert<IsIdentical<typeof c, number | undefined>>()
			observedC = c
			called.push('c')
		})

		called = []

		data$.a.b.c.set(1)

		expect(data$.a.b.c.value).toBe(1)
		expect(data$.value).toStrictEqual({ a: { b: { c: 1 } } })
		expect(data$.a.b.value).toStrictEqual({ c: 1 })

		expect(data$.exists).toBeTruthy()
		expect(data$.a.exists).toBeTruthy()
		expect(data$.a.b.exists).toBeTruthy()
		expect(data$.a.b.c.exists).toBeTruthy()

		expect(observedB).toStrictEqual({ c: 1 })
		expect(observedC).toBe(1)
		expect(called).toStrictEqual(['c', 'b'])

		called = []

		data$.a.delete()

		expect(observedB).toBeUndefined()
		expect(observedC).toBeUndefined()
		expect(called).toStrictEqual(['c', 'b'])

		expect(data$.exists).toBeTruthy()
		expect(data$.a.exists).toBeFalsy()
		expect(data$.a.b.exists).toBeFalsy()
		expect(data$.a.b.c.exists).toBeFalsy()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('union types', () => {
	// 	expect.hasAssertions()

	// 	type MyType = { a?: true } | { a?: false }

	// 	const data$ = createNestedSubject<MyType>({})

	// 	data$.a
	// })
})
