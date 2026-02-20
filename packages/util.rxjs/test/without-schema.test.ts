// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical, Value } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { SubscriptionLike } from 'rxjs'

import type { CustomSubjectTree, RequiredSubjectTree } from '~'
import { SubjectTree } from '~'

describe('SubjectTree', () => {
	it('type', () => {
		$Assert.is<SubjectTree<{}>, SubscriptionLike>
		// $Assert.is<SubjectTree<{}>, Subject<{}>>
		// $Assert.is<SubjectTree<{}>, RequiredSubjectTree<{}>>()
		$Assert.is<RequiredSubjectTree<{}>, SubjectTree<{}>>()
		$Assert.is<RequiredSubjectTree<{}>, SubjectTree<unknown>>()

		// type AA = RequiredSubjectTree<{}>['observers']

		type A = RequiredSubjectTree<{
			a0: number
			a1?: number
			b?: { b0: number; b1?: string }
			c: { c0: number; c1?: string }

			d: Record<string, { d0: number }>
		}>

		$Assert<IsIdentical<A['a0$']['exists'], true>>()
		$Assert<IsIdentical<A['a1$']['exists'], boolean>>()

		$Assert<IsIdentical<A['b$']['exists'], boolean>>()
		$Assert<IsIdentical<A['b$']['b0$']['exists'], boolean>>()
		$Assert<IsIdentical<A['b$']['b1$']['exists'], boolean>>()

		$Assert<IsIdentical<A['c$']['exists'], true>>()
		$Assert<IsIdentical<A['c$']['c0$']['exists'], true>>()
		$Assert<IsIdentical<A['c$']['c1$']['exists'], boolean>>()

		type B = A['d$']['test$']
		$Assert<IsIdentical<B['d0$']['exists'], boolean>>()

		//

		$Assert.is<
			CustomSubjectTree<{
				Input: { a: 1 }
				Output: { a: 1 }
				IsAncestorOptional: true
			}>,
			SubjectTree<{ a: 1 }>
		>()

		$Assert<
			IsIdentical<SubjectTree<number>['maybeValue'], number | undefined>
		>()

		$Assert<IsIdentical<SubjectTree<number>['exists'], boolean>>()

		// $Assert<
		// 	IsIdentical<
		// 		SubjectTree<{ a: 1 }>['asRequired$'],
		// 		RequiredSubjectTree<{ a: 1 }>
		// 	>
		// >()
	})

	it('delete root', () => {
		expect.hasAssertions()

		const data$ = new SubjectTree(undefined as unknown)
		$Assert<IsIdentical<typeof data$, RequiredSubjectTree<unknown>>>()

		expect(data$.value).toBeUndefined()

		data$.set(123)

		expect(data$.value).toBe(123)

		// @ts-expect-error root is non-optional
		data$.delete()

		expect(data$.maybeValue).toBeUndefined()

		expect(() => data$.value).toThrow(
			'.value called on SubjectTree without value',
		)
	})

	it('infer type from initial value', () => {
		const data$ = new SubjectTree({ a: 123 })
		$Assert<IsIdentical<typeof data$, RequiredSubjectTree<{ a: number }>>>()

		void data$
	})

	it('works', () => {
		expect.hasAssertions()

		const data$ = new SubjectTree<{
			/** A */
			a?: { b?: { c: number } }

			/** C */
			c: string

			/** D */
			d?: symbol
		}>({
			a: {},
			c: 'test',
		})

		$Assert<IsIdentical<(typeof data$)['c'], string>>()
		$Assert<IsIdentical<Value<typeof data$, 'd'>, symbol>>()

		$Assert<IsIdentical<typeof data$.delete, undefined>>()
		$Assert<IsIdentical<typeof data$.a$.delete, () => void>>()

		expect(data$.exists).toBeTruthy()
		expect(data$.a$.exists).toBeTruthy()
		expect(data$.a$.b$.exists).toBeFalsy()
		expect(data$.a$.b$.c$.exists).toBeFalsy()

		/** Auto-remove options identical to defaults (cleaner editor support) */
		$Assert<
			IsIdentical<
				typeof data$.a$.b$.c$,
				// SubjectTree<number>
				CustomSubjectTree<{
					Output: number
					Input: number
					IsOptional: false
					IsAncestorOptional: true
				}>
			>
		>()

		let observedB: { c: number } | undefined
		let observedC: number | undefined

		let called = [] as string[]

		data$.a$.b$.subscribe(b => {
			observedB = b
			called.push('b')
		})

		data$.a$.b$.c$.subscribe(c => {
			$Assert<IsIdentical<typeof c, number | undefined>>()
			observedC = c
			called.push('c')
		})

		called = []

		data$.a$.b$.c$.set(1)

		expect(data$.a$.b$.c$.value).toBe(1)
		expect(data$.a$.b$.c).toBe(1)

		expect(data$.value).toStrictEqual({ a: { b: { c: 1 } }, c: 'test' })

		expect(data$.a$.b$.value).toStrictEqual({ c: 1 })
		expect(data$.a$.b).toStrictEqual({ c: 1 })

		expect(data$.exists).toBeTruthy()
		expect(data$.a$.exists).toBeTruthy()
		expect(data$.a$.b$.exists).toBeTruthy()
		expect(data$.a$.b$.c$.exists).toBeTruthy()

		expect(observedB).toStrictEqual({ c: 1 })
		expect(observedC).toBe(1)
		expect(called).toStrictEqual(['c', 'b'])

		called = []

		data$.a$.delete()

		expect(observedB).toBeUndefined()
		expect(observedC).toBeUndefined()
		expect(called).toStrictEqual(['c', 'b'])

		expect(data$.exists).toBeTruthy()
		expect(data$.a$.exists).toBeFalsy()
		expect(data$.a$.b$.exists).toBeFalsy()
		expect(data$.a$.b$.c$.exists).toBeFalsy()
	})

	// it('union types', () => {
	// 	expect.hasAssertions()

	// 	type MyType = { a?: true } | { a?: false }

	// 	const data$ = createSubjectTree<MyType>({})

	// 	data$.a
	// })
})
