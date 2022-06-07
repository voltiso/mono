/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { OmitSimple, OmitSimple_ } from './OmitSimple'

describe('OmitSimple', () => {
	it('type', () => {
		expect.assertions(0)
		type X = OmitSimple<
			{
				a?: string
				readonly b?: number
			},
			'a'
		>
		Assert<IsIdentical<X, { readonly b?: number }>>()
	})

	it('generics', <T extends { a?: 1; b?: 1 }>() => {
		expect.assertions(0)

		type A = Omit<T, 'b'>
		type B = OmitSimple<T, 'b'>

		// @ts-expect-error Omit does not work, meh
		Assert.is<A, { a?: 1 }>() // does not work - works only with `{ a?: 1 | undefined }`
		Assert.is<B, { a?: 1 }>() // better!
	})

	type EasyObj = { readonly a?: 1; b: 2 }

	it('generics 2', <Obj extends EasyObj>() => {
		expect.assertions(0)

		type A1 = Omit<Obj, 'c'>
		// @ts-expect-error meh
		Assert.is<A1, EasyObj>() // does not work, meh

		type A2 = OmitSimple<Obj, 'c'>
		Assert.is<A2, EasyObj>()

		//

		type B1 = Omit<Obj, 'b'>
		// @ts-expect-error meh
		Assert.is<B1, { readonly a?: 1 }>() // does not work, meh

		type B2 = OmitSimple<Obj, 'b'>
		Assert.is<B2, { readonly a?: 1 }>()
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
})
