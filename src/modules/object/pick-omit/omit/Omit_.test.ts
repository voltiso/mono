/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from '../../../../IsEqual'
import { Assert } from '../../../bdd'
import { Omit_ } from './Omit_'

describe('Omit_', () => {
	it('type', () => {
		expect.assertions(0)

		type B = Omit_<{ readonly a?: 1; 2: 2 }, number>
		Assert<IsIdentical<B, { readonly a?: 1 }>>()

		type A = Omit_<{ readonly a?: 1; b: 2 }, 'b'>
		Assert<IsIdentical<A, { readonly a?: 1 }>>()
	})

	type Obj = {
		[k: string]: 1 | 2
		[k: number]: 2
		[k: symbol]: 3
		a: 1
	}

	it('index signatures', () => {
		expect.assertions(0)

		type A0 = Omit_<Obj, 'a'>
		Assert<
			IsIdentical<A0, { [k: string]: 1 | 2; [k: number]: 2; [k: symbol]: 3 }>
		>()

		type A1 = Omit_<Obj, 'a'>
		Assert<
			IsIdentical<A1, { [k: string]: 1 | 2; [k: number]: 2; [k: symbol]: 3 }>
		>()

		//

		type B0 = Omit<Obj, 'a' | symbol>
		Assert<IsIdentical<B0, { [k: string]: 1 | 2; [k: number]: 2 }>>()

		type B1 = Omit_<Obj, 'a' | symbol>
		Assert<IsIdentical<B1, { [k: string]: 1 | 2; [k: number]: 2 }>>()

		//

		// type C0 = Pick<Obj, string>
		// Assert<IsIdentical<C0, { [k: string]: 1 | 2; a: 1 }>>() // bad!

		// type C1 = Omit_<Obj, string>
		// Assert<IsIdentical<C1, { [k: string]: 1 | 2; a: 1 }>>() // bad!
	})

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	it('generic', <_O extends Obj>() => {
		expect.assertions(0)

		// type A0 = Omit<O, 'a' | symbol>
		// Assert.is<A0, O>()

		// type A1 = Omit_<O, 'a' | symbol>
		// Assert.is<A1, O>()

		// type C0 = Omit<O, string>
		// Assert.is<C0, Obj>() // bad!

		// type C1 = Omit_<O, string>
		// Assert.is<C1, Obj>() // bad!
	})

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type Obj = {
			readonly a?: 1
			b: 2
		}
		const obj = {} as unknown as Omit_<Obj, 'b'>
		// hit F12 here:
		void obj.a
	})
})
