// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../../type'
import { Assert } from '../../../type'
import type { _ } from '../../flatten'
import type { VPick_ } from '../pick'
import type { OmitPrecise_ } from './OmitPrecise.js'
import type { OmitSignatures } from './OmitSignatures.js'
import type { OmitSimple, OmitSimple_ } from './OmitSimple.js'
import type { VOmit } from './VOmit.js'

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

	it('generic #1', <T extends { a?: 1; b?: 1 }>() => {
		expect.assertions(0)

		type A = Omit<T, 'b'>
		type B = OmitSimple<T, 'b'>

		Assert.is<A, { a?: 1 | undefined }>() // does not work
		Assert.is<B, { a?: 1 }>() // better!
	})

	it('generic #2', <T extends { a?: 1; b?: 2 }>() => {
		expect.assertions(0)

		type A = _<T>
		Assert.is<A, { a?: 1 }>()

		type B1 = Omit<T, 'b'>
		type B2 = VOmit<T, 'b'>

		Assert.is<B1, { a?: 1 | undefined }>() // does not work!
		Assert.is<B2, { a?: 1 }>() // better!

		type C1 = _<Omit<T, 'b'>>
		type C2 = _<VOmit<T, 'b'>>

		Assert.is<C1, { a?: 1 | undefined }>() // does not work!
		Assert.is<C2, { a?: 1 }>() // better!
	})

	type EasyObj = { readonly a?: 1; b: 2 }

	it('generic #3', <Obj extends EasyObj>() => {
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

	type Properties = {
		[k: string]: number
		[k: number]: 1
		[k: symbol]: 2
	}

	it('index signatures', () => {
		expect.assertions(0)

		type A = VOmit<Properties, 'a'>
		Assert.is<A, Properties>()
		Assert<IsIdentical<A, Properties>>()
	})

	it('generics + index signatures', <P extends Properties, K extends keyof any>() => {
		expect.assertions(0)

		type A = VOmit<P, keyof P>
		Assert.is<A, Properties>()

		type AA = _<VOmit<P, keyof P>>
		Assert.is<AA, Properties>()

		//

		type B = VOmit<P, 'a'>
		Assert.is<B, Properties>()

		type BB = _<VOmit<P, 'a'>>
		Assert.is<BB, Properties>()

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
			2: 2
			a: 1
		}
		type A = VPick_<OmitSignatures<AObj>, 2>
		Assert<IsIdentical<A, { 2: 2 }>>()

		type BObj = {
			[k: string]: number
			2: 2
			a: 1
			b: 33
		}

		type B = OmitPrecise_<BObj, never>

		Assert<
			IsIdentical<
				B,
				{
					[k: string]: number
					2: 2
					a: 1
					b: 33
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
					2: 2
					b: 33
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
})
