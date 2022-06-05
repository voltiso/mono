/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { VOmit } from './VOmit'
import { _ } from '../flatten'

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

	type Props = {
		[k: string]: number
		[k: number]: 1
		[k: symbol]: 2
	}

	it('generics 3', <P extends Props, K extends keyof any>() => {
		expect.assertions(0)

		type A = VOmit<P, keyof P>
		Assert.is<A, Props>()

		// type AA = _<VOmit<P, keyof P>>
		// Assert.is<AA, Props>() // :(

		type B = VOmit<P, 'a'>
		Assert.is<B, Props>()

		type BB = _<VOmit<P, 'a'>>
		Assert.is<BB, Props>()

		type C = VOmit<P, K>
		Assert.is<C, Props>()

		// type CC = _<VOmit<P, K>>
		// Assert.is<CC, Props>() // :(
	})

	it('index signature', () => {
		expect.assertions(0)

		type A = VOmit<{ [k: string]: number; a: 1; 2: 2 }, string>
		Assert<IsIdentical<A, { 2: 2 }>>()

		type B = VOmit<
			{
				[k: string]: number
				a: 1
				b: 33
				2: 2
			},
			number | 'b' | 'asd'
		>

		Assert<
			IsIdentical<
				B,
				{
					[k: string]: number
					a: 1
				}
			>
		>()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('generics and index signature', <P extends {
	// 	magic: boolean
	// }>() => {
	// 	expect.assertions(0)

	// 	type MyOmit<O, K> = {
	// 		[k in keyof O as k extends K ? k : never]: O[k]
	// 	}

	// 	type A = MyOmit<P, 'css' & keyof P>

	// 	const a = 0 as unknown as A
	// 	void a.magic // :(
	// })
})
