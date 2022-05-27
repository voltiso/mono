/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable no-undefined */

import { Assert } from '../../../bdd'
import { IsIdentical } from '../../../../IsEqual'
import { TryGetProperty, tryGetProperty } from './tryGetProperty'

describe('tryGetProperty', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(tryGetProperty({ a: 0 }, 'a')).toBe(0)
		expect(tryGetProperty({} as { a?: number }, 'a')).toBeUndefined()

		expect(tryGetProperty(undefined as undefined | { a?: number }, 'a')).toBeUndefined()

		// @ts-expect-error __proto__ does not exist
		expect(() => tryGetProperty({ a: 1 }, '__proto__')).toThrow('pollution')

		// @ts-expect-error __proto__ does not exist
		expect(() => tryGetProperty({ a: 1 }, 'constructor')).toThrow('pollution')
	})

	it('works with private class fields', () => {
		expect.hasAssertions()

		class Foo {
			private field

			private unknownField: unknown

			#ecmaPrivate = 123 as const
			#ecmaUnknownPrivate: unknown

			constructor(field: 123) {
				this.field = field
				void this.field
				void this.unknownField
				void this.#ecmaPrivate
				void this.#ecmaUnknownPrivate
			}
		}

		const c = new Foo(123)

		// @ts-expect-error private
		expect(c.field).toBe(123)

		Assert<IsIdentical<Foo['field'], 123>>()
		Assert<IsIdentical<Foo['unknownField'], unknown>>()

		type A = TryGetProperty<Foo, 'field'>
		Assert<IsIdentical<A, 123>>()

		type B = TryGetProperty<Foo, 'unknownField'>
		Assert<IsIdentical<B, unknown>>()

		type C = TryGetProperty<Foo, 'nonExisting'>
		Assert<IsIdentical<C, undefined>>()
	})
})
