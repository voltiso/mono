// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'
import { describe, expect, it } from '@jest/globals'

import type { Newable } from '~/function'
import type { IsIdentical } from '~/type'

import type { Entry } from './Entry'
import { getCoercedEntries } from './getEntries'

describe('object/entries', () => {
	it('works - static', () => {
		expect.assertions(0)

		$Assert(
			$Is<Entry<{}>>() //
				.identicalTo<never>(),

			$Is<Entry<{ a: 1; b: 2 }>>() //
				.identicalTo<['a', 1] | ['b', 2]>(),

			$Is<Entry<{ a: 1; b?: 2 }>>() //
				.identicalTo<['a', 1] | ['b', 2]>(),

			$Is<Entry<object>>() //
				.identicalTo<never>(),
		)
	})

	type InferableLiteral =
		| number
		| string
		| symbol
		| bigint
		| boolean
		| null
		| undefined

	type InferableMutableTuple = RootSchemable[]
	type InferableReadonlyTuple = readonly RootSchemable[]
	type InferableTuple = InferableMutableTuple | InferableReadonlyTuple

	type InferableObject = { [k: keyof any]: Schemable }

	type Inferable = InferableObject | InferableTuple | InferableLiteral | Newable

	type Schemable = Inferable
	type RootSchemable = Inferable

	it('works - static - generic', <X extends InferableObject>() => {
		expect.assertions(0)

		type A = Entry<X>
		$Assert.is<A, [keyof any, Schemable]>()
	})

	it('works', () => {
		expect.hasAssertions()

		const sym = Symbol('sym')
		const sym2 = Symbol('sym2')

		const obj = {
			1: 1 as const,
			a: 'a' as const,
			nonEnumerable: 123 as const,
			[sym]: sym,
			[sym2]: sym2,
		}

		Object.defineProperty(obj, 'nonEnumerable', { enumerable: false })
		Object.defineProperty(obj, sym2, { enumerable: false })

		expect(Object.entries(obj)).toStrictEqual([
			['1', 1],
			['a', 'a'],
		])

		const a = getCoercedEntries(obj, { includeSymbols: true })

		expect(a).toStrictEqual([
			['1', 1],
			['a', 'a'],
			[sym, sym],
		])

		type A = (typeof a)[number]
		$Assert<
			IsIdentical<
				A,
				| ['1', 1]
				| ['a', 'a']
				| [typeof sym, symbol]
				| [typeof sym2, symbol]
				| ['nonEnumerable', 123]
			>
		>()

		const b = getCoercedEntries(obj)

		expect(b).toStrictEqual([
			['1', 1],
			['a', 'a'],
		])

		type B = (typeof b)[number]
		$Assert<IsIdentical<B, ['1', 1] | ['a', 'a'] | ['nonEnumerable', 123]>>()

		const c = getCoercedEntries(obj, { includeNonEnumerable: true })

		expect(c).toStrictEqual([
			['1', 1],
			['a', 'a'],
			['nonEnumerable', 123],
		])

		type C = (typeof c)[number]
		$Assert<IsIdentical<C, ['1', 1] | ['a', 'a'] | ['nonEnumerable', 123]>>()

		//

		const d = getCoercedEntries(obj, {
			includeNonEnumerable: true,
			includeSymbols: true,
		})

		expect(d).toStrictEqual([
			['1', 1],
			['a', 'a'],
			['nonEnumerable', 123],
			[sym, sym],
			[sym2, sym2],
		])

		type D = (typeof d)[number]
		$Assert<
			IsIdentical<
				D,
				| ['1', 1]
				| ['a', 'a']
				| ['nonEnumerable', 123]
				| [typeof sym, symbol]
				| [typeof sym2, symbol]
			>
		>()
	})
})
