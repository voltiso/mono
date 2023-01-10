// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { CustomNestedSubject, NestedSubject } from '~'

describe('NestedSubject with schema', () => {
	it('simple schema', () => {
		const MyNestedSubject = NestedSubject.schema({
			str: s.string,
		})

		// ! changed: initialValue is now required
		// ;() => {
		// 	const wrongSubject = new MyNestedSubject()
		// 	$Assert.is<typeof wrongSubject, StaticError>()
		// }

		// @ts-expect-error wrong initialValue type
		;() => new MyNestedSubject({ str: 123 })

		expect(() => new MyNestedSubject({ str: 123 as never })).toThrow(
			'.str should be string (got 123)',
		)

		const subject = new MyNestedSubject({ str: 'hello' })

		/** Simplified typings if `Input === Output` */
		$Assert<IsIdentical<typeof subject, NestedSubject<{ str: string }>>>()
	})

	it('raw api', () => {
		const unknownData = new CustomNestedSubject({})
		$Assert<IsIdentical<typeof unknownData, NestedSubject<unknown>>>()

		//
		;() => {
			const simpleData = new CustomNestedSubject({ schema: { str: s.string } })
			$Assert<IsIdentical<typeof simpleData, NestedSubject<{ str: string }>>>()
		}

		expect(
			() => new CustomNestedSubject({ schema: { str: s.string } }),
		).toThrow('should be object (got undefined)')

		const data = new CustomNestedSubject({ schema: { str: s.string.optional } })
		void data
	})

	it('works', () => {
		expect.hasAssertions()

		const MyNestedSubject = NestedSubject.schema({
			a: {
				b: {
					c: s.number.min(0).default(123),
				},
			},

			x: s.number,
		})

		// expect(() => MyNestedSubject())

		const data = new MyNestedSubject({ x: 33 })

		// console.log({ data })

		expect(data.a.b.c.value).toBe(123)

		data.patch({ x: 1 })

		expect(data.value).toStrictEqual({
			a: { b: { c: 123 } },
			x: 1,
		})

		let called: string[] = []

		let observerA: unknown = {}
		data.a.subscribe(x => {
			observerA = x
			called.push('a')
		})

		let observerC = 0
		data.a.b.c.subscribe(x => {
			observerC = x
			called.push('c')
		})

		let observerC2 = 0
		data.a.b.c.subscribe(x => {
			observerC2 = x
			called.push('c2')
		})

		expect(observerC).toBe(0) // no first update
		// expect(observerC).toBe(123)

		expect(called).toStrictEqual([]) // no first update
		// expect(called).toStrictEqual(['a', 'c', 'c2'])

		called = []

		data.a.b.patch({ c: 99 })

		expect(called).toStrictEqual(['c', 'c2', 'a'])
		expect(observerC).toBe(99)
		expect(observerC2).toBe(99)
		expect(observerA).toStrictEqual({ b: { c: 99 } })

		data.a.patch({ b: { c: 99 } })

		expect(called).toStrictEqual(['c', 'c2', 'a']) // nothing new called
	})
})
