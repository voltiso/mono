/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from '../../IsEqual'
import { Assert } from '../bdd'
import { Value } from './value'
import { VPartial } from './VPartial'

describe('Partial', () => {
	it('works', () => {
		expect.assertions(0)

		type A = VPartial<{ a: 1 } & { b: 2 }>
		Assert<IsIdentical<A, { a?: 1; b?: 2 }>>()
	})

	it('generics', <Obj extends { a?: 1 }>() => {
		expect.assertions(0)

		//

		type A = Partial<Obj>
		type B = VPartial<Obj>

		Assert.is<A, { a?: 1 | undefined }>() // built-in `Partial` does not work!
		Assert.is<B, { a?: 1 }>() // better!

		// Assert.is<A, Obj>() // does not work :(
		// Assert.is<B, Obj>() // does not work :(

		//

		Assert.is<Value<Obj, 'a'>, 1>()

		type C = VPartial<Obj>
		Assert.is<Exclude<VPartial<Obj>[keyof Obj & 'a'], undefined>, 1>()
		Assert.is<Value<C, 'a'>, 1>()
		// Assert.is<C, Obj>() // does not work :(
	})
})
