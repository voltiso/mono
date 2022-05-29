/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { VOmit } from './Omit'

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
})
