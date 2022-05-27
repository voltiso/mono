/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/ban-types */
import { Assert, Is } from '../../bdd'
import { Newable } from '../../function'
import { Entry } from './Entry'
import { getEntries } from './getEntries'

describe('object/entries', () => {
	it('works - static', () => {
		expect.assertions(0)

		Assert(
			Is<Entry<{}>>() //
				.identicalTo<never>(),

			Is<Entry<{ a: 1; b: 2 }>>() //
				.identicalTo<['a', 1] | ['b', 2]>(),

			Is<Entry<{ a: 1; b?: 2 }>>() //
				.identicalTo<['a', 1] | ['b', 2]>(),

			Is<Entry<object>>() //
				.identicalTo<never>()
		)
	})

	type InferableLiteral = number | string | symbol | bigint | boolean | null | undefined

	type InferableMutableTuple = RootSchemable[]
	type InferableReadonlyTuple = readonly RootSchemable[]
	type InferableTuple = InferableMutableTuple | InferableReadonlyTuple

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type InferableObject = { [k: keyof any]: Schemable }

	type Inferable = InferableObject | InferableTuple | InferableLiteral | Newable

	type Schemable = Inferable
	type RootSchemable = Inferable

	it('works - static - generic', <X extends InferableObject>() => {
		expect.assertions(0)

		type A = Entry<X>
		Assert.is<A, [keyof any, Schemable]>()
	})

	it('works', () => {
		expect.hasAssertions()

		const sym = Symbol('sym')
		const sym2 = Symbol('sym2')

		const obj = { 1: 1, a: 'a', nonEnumerable: 123, [sym]: sym, [sym2]: sym2 }

		Object.defineProperty(obj, 'nonEnumerable', { enumerable: false })
		Object.defineProperty(obj, sym2, { enumerable: false })

		expect(Object.entries(obj)).toStrictEqual([
			['1', 1],
			['a', 'a'],
		])

		const a = getEntries(obj)
		expect(a).toStrictEqual([
			['1', 1],
			['a', 'a'],
			[sym, sym],
		])
	})
})
