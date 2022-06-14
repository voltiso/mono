/* eslint-disable no-magic-numbers */
import { Assume } from './Assume'
import { IsIdentical } from './IsEqual'
import { Assert } from './_modules/bdd'

describe('Assume', () => {
	it('type', () => {
		expect.assertions(0)

		Assert<IsIdentical<Assume<number, 123>, 123>>()
		Assert<IsIdentical<Assume<number, number>, number>>()

		Assert<IsIdentical<Assume<123, number>, never>>()
	})

	it('generic', <Str extends string>() => {
		expect.assertions(0)

		type A = Assume<'a' | 'b', Str>
		Assert.is<A, 'a' | 'b'>()

		type B = Assume<1 | 2 | 3, Str>
		Assert.is<B, never>()

		type C = Assume<Str, 'a' | 'b'>
		Assert.is<C, 'a' | 'b'>()
		Assert.is<C, Str>()
	})
})
