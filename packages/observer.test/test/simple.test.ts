// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { injectCreateNestedSubjectWithSchema } from '@voltiso/observer'
import * as s from '@voltiso/schemar'

const observerDiContext = {
	schema: s.schema,
}

const createNestedSubjectWithSchema = injectCreateNestedSubjectWithSchema(observerDiContext)

describe('simple', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(() =>
			createNestedSubjectWithSchema({
				schemable: {
					a: {
						b: {
							c: s.number.min(0).default(123),
						},
					},

					x: s.number,
				},
			}),
		).toThrow('.x')

		const data = createNestedSubjectWithSchema({
			initialValue: { x: 33 },

			schemable: {
				a: {
					b: s.object({
						c: s.number.min(0).default(123),
					}),
				},

				x: s.number,
			},
		})

		expect(data.a.b.c.value).toBe(123)

		data.update({ x: 1 })

		expect(data.value).toStrictEqual({
			a: { b: { c: 123 } },
			x: 1,
		})

		let called: string[] = []

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

		let observerA: unknown = {}
		data.a.subscribe(x => {
			observerA = x
			called.push('a')
		})

		expect(observerC).toBe(123)

		expect(called).toStrictEqual(['c', 'c2', 'a'])

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
