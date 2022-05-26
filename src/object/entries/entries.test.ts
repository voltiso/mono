/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/ban-types */
import { Assert, Is } from '../../bdd'
import { Newable } from '../../function'
import { Entry } from './entries'

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
})
