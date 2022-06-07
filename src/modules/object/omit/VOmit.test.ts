/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { VOmit } from './VOmit'
import { _ } from '../flatten'
import { OmitIndexSignatures } from './OmitIndexSignatures'
import { VPick_ } from '../pick'
import { OmitPrecise_ } from './OmitPrecise'
import { OmitSimple, OmitSimple_ } from './OmitSimple'

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
		type B = OmitSimple<T, 'b'>

		Assert.is<A, { a?: 1 | undefined }>() // does not work
		Assert.is<B, { a?: 1 }>() // better!
	})

	type EasyObj = { readonly a?: 1; b: 2 }

	it('generics 2', <Obj extends EasyObj>() => {
		expect.assertions(0)

		type A1 = Omit<Obj, 'c'>
		// @ts-expect-error meh
		Assert.is<A1, { readonly a?: 1 }>() // does not work, meh

		type A2 = OmitSimple<Obj, 'c'>
		Assert.is<A2, { readonly a?: 1 }>()

		type A3 = VOmit<Obj, 'c'>
		Assert.is<A3, { readonly a?: 1 }>()

		//

		type B1 = Omit<Obj, 'b'>
		// @ts-expect-error meh
		Assert.is<B1, { readonly a?: 1 }>() // does not work, meh

		type B2 = VOmit<Obj, 'b'>
		Assert.is<B2, { readonly a?: 1 }>()
	})

	type Props = {
		[k: string]: number
		[k: number]: 1
		[k: symbol]: 2
	}

	it('index signatures', () => {
		expect.assertions(0)

		type A = VOmit<Props, 'a'>
		Assert.is<A, Props>()
		Assert<IsIdentical<A, Props>>()
	})

	it('generics + index signatures', <P extends Props, K extends keyof any>() => {
		expect.assertions(0)

		type A = VOmit<P, keyof P>
		Assert.is<A, Props>()

		type AA = _<VOmit<P, keyof P>>
		// TODO
		// @ts-expect-error oops
		Assert.is<AA, Props>()

		//

		type B = VOmit<P, 'a'>
		Assert.is<B, Props>()

		type BB = _<VOmit<P, 'a'>>
		Assert.is<BB, Props>()

		//

		type C0 = Omit<P, keyof P & K>
		Assert.is<P, C0>()

		type C = VOmit<P, keyof P & K>
		// TODO
		// @ts-expect-error oops
		Assert.is<P, C>() // oops...

		type CC = _<VOmit<P, keyof P & K>>
		// TODO
		// @ts-expect-error oops
		Assert.is<P, CC>() // oops...
	})

	it('index signatures #2', () => {
		expect.assertions(0)

		type AObj = {
			[k: string]: number
			a: 1
			2: 2
		}
		type A = VPick_<OmitIndexSignatures<AObj>, 2>
		Assert<IsIdentical<A, { 2: 2 }>>()

		type BObj = {
			[k: string]: number
			a: 1
			b: 33
			2: 2
		}

		type B = OmitPrecise_<BObj, never>

		Assert<
			IsIdentical<
				B,
				{
					[k: string]: number
					a: 1
					b: 33
					2: 2
				}
			>
		>()

		type BB = OmitPrecise_<BObj, string>
		Assert<IsIdentical<BB, { 2: 2 }>>()

		type BBB = OmitPrecise_<BObj, 'a'>
		Assert<
			IsIdentical<
				BBB,
				{
					[k: string]: number
					b: 33
					2: 2
				}
			>
		>()
	})

	it('vscode finds original definitions', () => {
		expect.assertions(0)

		type Base = {
			readonly a?: 1
			readonly b: 2
		}

		const x = {} as unknown as OmitSimple_<Base, 'b'>
		void x.a
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
