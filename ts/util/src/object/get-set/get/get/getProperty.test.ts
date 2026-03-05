// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from 'vitest'

import type { IsIdentical } from '~/type'

import type { GetPropertyComplex } from './getProperty'
import { getProperty } from './getProperty'

describe('getProperty', () => {
	it('generic', <O extends object, K extends keyof O>() => {
		expect.assertions(0)

		$Assert.is<GetPropertyComplex<O, K>, O[K]>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(getProperty({ a: 0 }, 'a')).toBe(0)
		expect(() => getProperty({} as { a?: number }, 'a')).toThrow(
			`property not found @ getProperty({}, 'a')`,
		)

		expect(() => getProperty({ a: 1 }, '__proto__')).toThrow('pollution')

		expect(() => getProperty({ a: 1 }, 'constructor')).toThrow('pollution')

		expect(() => getProperty('test' as never, 'a')).toThrow(
			'property not found',
		)
	})

	it('works with optionals', () => {
		expect.hasAssertions()

		expect(getProperty({ a: 1 } as { a?: 1 }, 'a')).toBe(1)
	})

	it('works with non-objects', () => {
		function a() {}
		a.test = 123

		expect(getProperty(a, 'test')).toBe(123)
	})

	it('works with private class fields', () => {
		expect.hasAssertions()

		class Foo {
			private readonly field
			private readonly unknownField: unknown

			#ecmaPrivate = 123 as const
			#ecmaUnknownPrivate: unknown

			private readonly undef: undefined

			private readonly optUndef?: undefined
			private readonly optNever?: never

			private readonly optString?: string
			private readonly optStringUndef?: string | undefined

			constructor(field: 123) {
				this.field = field
				void this.field
				void this.unknownField
				void this.#ecmaPrivate
				void this.#ecmaUnknownPrivate
				void this.undef
				void this.optUndef
				void this.optNever
				void this.optString
				void this.optStringUndef
			}
		}

		const c = new Foo(123)

		// @ts-expect-error private
		expect(c.field).toBe(123)

		$Assert<IsIdentical<Foo['field'], 123>>()
		$Assert<IsIdentical<Foo['unknownField'], unknown>>()

		type A = GetPropertyComplex<Foo, 'field'>
		$Assert<IsIdentical<A, 123>>()

		type B = GetPropertyComplex<Foo, 'unknownField'>
		$Assert<IsIdentical<B, unknown>>()

		type C = GetPropertyComplex<Foo, 'nonExisting'>
		$Assert<IsIdentical<C, never>>()

		type D = GetPropertyComplex<Foo, 'undef'>
		$Assert<IsIdentical<D, never>>() // WRONG! should be undefined

		type E = GetPropertyComplex<Foo, 'optUndef'>
		$Assert<IsIdentical<E, never>>() // WRONG! should be undefined

		type F = GetPropertyComplex<Foo, 'optNever'>
		$Assert<IsIdentical<F, never>>()

		type G = GetPropertyComplex<Foo, 'optString'>
		$Assert<IsIdentical<G, string>>()

		type H = GetPropertyComplex<Foo, 'optStringUndef'>
		$Assert<IsIdentical<H, string>>() // WRONG! should be string | undefined
	})
})
