// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createNestedSubject } from '@voltiso/observer'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

describe('NestedSubject', () => {
	it('works', () => {
		expect.hasAssertions()

		const data$ = createNestedSubject<{ a?: { b?: { c: number } } }>({ a: {} })

		expect(data$.exists).toBeTruthy()
		expect(data$.a.exists).toBeTruthy()
		expect(data$.a.b.exists).toBeFalsy()
		expect(data$.a.b.c.exists).toBeFalsy()

		let observedB: { c: number } | undefined
		let observedC: number | undefined

		let called = [] as string[]

		data$.a.b.subscribe(b => {
			observedB = b
			called.push('b')
		})

		data$.a.b.c.subscribe(c => {
			Assert<IsIdentical<typeof c, number | undefined>>()
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
