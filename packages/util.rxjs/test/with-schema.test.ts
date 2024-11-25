// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { CustomSubjectTree, SubjectTree } from '~'

describe('SubjectTree with schema', () => {
	it('simple schema', () => {
		const MySubjectTree = SubjectTree.withSchema({
			str: s.string,
		})

		// ! changed: initialValue is now required
		// ;() => {
		// 	const wrongSubject = new MySubjectTree()
		// 	$Assert.is<typeof wrongSubject, StaticError>()
		// }

		// @ts-expect-error wrong initialValue type
		;() => new MySubjectTree({ str: 123 })

		expect(() => new MySubjectTree({ str: 123 as never })).toThrow(
			'.str should be string (got 123)',
		)

		const subject = new MySubjectTree({ str: 'hello' })

		// type AA = [typeof subject] extends [SubjectTree<{ str: string }>] ? 1 : 0
		// type BB = [SubjectTree<{ str: string }>] extends [typeof subject] ? 1 : 0

		// type Check<A,B> = [A] extends [B] ? [B] extends [A] ? true : false : false

		// type B = Check<typeof subject, SubjectTree<{ str: string }>>
		// $Assert<B>()

		/** Simplified typings if `Input === Output` */

		// @ts-expect-error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! new TS bug?
		$Assert<IsIdentical<typeof subject, SubjectTree<{ str: string }>>>()
	})

	it('raw api', () => {
		const unknownData = new CustomSubjectTree({})
		$Assert<IsIdentical<typeof unknownData, SubjectTree<unknown>>>()

		//
		;() => {
			const simpleData = new CustomSubjectTree({ schema: { str: s.string } })
			$Assert<IsIdentical<typeof simpleData, SubjectTree<{ str: string }>>>()
		}

		expect(() => new CustomSubjectTree({ schema: { str: s.string } })).toThrow(
			'should be object (got undefined)',
		)

		const data = new CustomSubjectTree({ schema: { str: s.string.optional } })
		void data
	})

	it('works', () => {
		expect.hasAssertions()

		const MySubjectTree = SubjectTree.withSchema({
			a: {
				b: {
					c: s.number.min(0).default(123),
				},
			},

			x: s.number,
		})

		// expect(() => MySubjectTree())

		const data$ = new MySubjectTree({ x: 33 })

		// console.log({ data })

		expect(data$.a$.b$.c$.value).toBe(123)
		expect(data$.a$.b$.c).toBe(123)
		expect(data$.a$.b.c).toBe(123)
		expect(data$.a.b.c).toBe(123)

		data$.patch({ x: 1 })

		expect(data$.value).toStrictEqual({
			a: { b: { c: 123 } },
			x: 1,
		})

		let called: string[] = []

		let observerA: unknown = {}
		data$.a$.subscribe(x => {
			observerA = x
			called.push('a')
		})

		let observerC = 0
		data$.a$.b$.c$.subscribe(x => {
			observerC = x
			called.push('c')
		})

		let observerC2 = 0
		data$.a$.b$.c$.subscribe(x => {
			observerC2 = x
			called.push('c2')
		})

		expect(observerC).toBe(0) // no first update
		// expect(observerC).toBe(123)

		expect(called).toStrictEqual([]) // no first update
		// expect(called).toStrictEqual(['a', 'c', 'c2'])

		called = []

		data$.a$.b$.patch({ c: 99 })

		expect(called).toStrictEqual(['c', 'c2', 'a'])
		expect(observerC).toBe(99)
		expect(observerC2).toBe(99)
		expect(observerA).toStrictEqual({ b: { c: 99 } })

		data$.a$.patch({ b: { c: 99 } })

		expect(called).toStrictEqual(['c', 'c2', 'a']) // nothing new called
	})
})
