// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/prefer-readonly */

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { TryGetProperty } from './tryGetProperty'
import { tryGetProperty } from './tryGetProperty'

describe('tryGetProperty', () => {
	it('type - indexed', () => {
		expect.assertions(0)

		type A = TryGetProperty<{ [k: string]: 0 }, string>
		$Assert<IsIdentical<A, 0 | undefined>>()

		type B = TryGetProperty<{ [k: string]: 0 }, 'test'>
		$Assert<IsIdentical<B, 0 | undefined>>()

		type C = TryGetProperty<{ a: 1 }, 'test'>
		$Assert<IsIdentical<C, undefined>>()

		type D = TryGetProperty<{ [k: string]: number; test: 0 }, 'test'>
		$Assert<IsIdentical<D, 0>>()

		type E = TryGetProperty<{ [k: string]: number; test?: 0 }, 'test'>
		$Assert<IsIdentical<E, 0 | undefined>>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(tryGetProperty({ a: 0 }, 'a')).toBe(0)
		expect(tryGetProperty({} as { a?: number }, 'a')).toBeUndefined()

		expect(
			tryGetProperty(undefined as undefined | { a?: number }, 'a'),
		).toBeUndefined()

		expect(() => tryGetProperty({ a: 1 }, '__proto__')).toThrow('pollution')

		expect(() => tryGetProperty({ a: 1 }, 'constructor')).toThrow('pollution')
	})

	it('works with private class fields', () => {
		expect.hasAssertions()

		class Foo {
			private readonly field

			private readonly unknownField: unknown

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

		$Assert<IsIdentical<Foo['field'], 123>>()
		$Assert<IsIdentical<Foo['unknownField'], unknown>>()

		type A = TryGetProperty<Foo, 'field'>
		$Assert<IsIdentical<A, 123>>()

		type B = TryGetProperty<Foo, 'unknownField'>
		$Assert<IsIdentical<B, unknown>>()

		type C = TryGetProperty<Foo, 'nonExisting'>
		$Assert<IsIdentical<C, undefined>>()
	})
})
