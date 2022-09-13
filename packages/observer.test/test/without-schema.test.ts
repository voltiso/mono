// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createNestedSubject } from '@voltiso/observer'

describe('NestedSubject', () => {
	it('works', () => {
		expect.hasAssertions()

		const data$ = createNestedSubject<{ a?: { b?: { c: number } } }>({ a: {} })

		let observedB = { c: 0 }
		let observedC = 0

		let called = [] as string[]

		data$.a.b.subscribe(b => {
			observedB = b
			called.push('b')
		})

		data$.a.b.c.subscribe(c => {
			observedC = c
			called.push('c')
		})

		called = []

		data$.a.b.c.set(1)

		expect(data$.a.b.c.value).toBe(1)
		expect(data$.a.b.value).toStrictEqual({ c: 1 })
		expect(data$.value).toStrictEqual({ a: { b: { c: 1 } } })

		expect(observedB).toStrictEqual({ c: 1 })
		expect(observedC).toBe(1)
		expect(called).toStrictEqual(['c', 'b'])
	})
})
