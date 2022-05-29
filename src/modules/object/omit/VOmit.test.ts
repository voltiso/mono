/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { VOmit } from './VOmit'

describe('Omit', () => {
	it('works', () => {
		expect.assertions(0)
		type X = VOmit<
			{
				a: string
				b: number
			},
			'a'
		>
		Assert<IsIdentical<X, { b: number }>>()
	})

	it('works with optional properties', () => {
		expect.assertions(0)
		type X = VOmit<
			{
				a?: string
				b?: number
			},
			'a'
		>
		Assert<IsIdentical<X, { b?: number }>>()
	})

	it('generics', <T extends { a?: 1; b?: 1 }>() => {
		expect.assertions(0)

		type A = Omit<T, 'b'>
		type B = VOmit<T, 'b'>

		Assert.is<A, { a?: 1 | undefined }>() // does not work
		Assert.is<B, { a?: 1 }>() // better!
	})

	type SomeType = { a: 1; b: 2 }

	it('generics 2', <T extends SomeType>() => {
		expect.assertions(0)

		type A1 = Omit<T, 'c'>
		type A2 = VOmit<T, 'c'>

		Assert.is<A1, SomeType>()
		Assert.is<A2, SomeType>()

		type B1 = Omit<T, 'b'>
		type B2 = VOmit<T, 'b'>

		Assert.is<B1, { a: 1 }>()
		Assert.is<B2, { a: 1 }>()
	})
})
