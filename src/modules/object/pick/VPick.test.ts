// TODO does not work with generics + index signatures

/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from '../../../IsEqual'
import { Assert } from '../../bdd'
import { VPick, VPick_ } from './VPick'

describe('VPick', () => {
	it('type', () => {
		expect.assertions(0)

		type A = VPick<{ readonly a?: 1; b: 2 }, 'a'>
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

		type A0 = Pick<Obj, 'a'>
		Assert<IsIdentical<A0, { a: 1 }>>()

		type A1 = VPick<Obj, 'a'>
		Assert<IsIdentical<A1, { a: 1 }>>()

		//

		type B0 = Pick<Obj, 'a' | symbol>
		Assert<IsIdentical<B0, { [k: symbol]: 3; a: 1 }>>()

		type B1 = VPick<Obj, 'a' | symbol>
		Assert<IsIdentical<B1, { [k: symbol]: 3; a: 1 }>>()

		//

		// type C0 = Pick<Obj, string>
		// Assert<IsIdentical<C0, { [k: string]: 1 | 2; a: 1 }>>() // bad!

		type C1 = VPick_<Obj, string>
		Assert<IsIdentical<C1, { [k: string]: 1 | 2; a: 1 }>>() // better 8)

		//

		type D0 = Pick<Obj, number>
		Assert<IsIdentical<D0, { [k: number]: 2 }>>()

		type D1 = VPick_<Obj, number>
		Assert<IsIdentical<D1, { [k: number]: 2 }>>()
	})

	type ObjA = {
		readonly a?: 1
		b: 2
	}

	it('generic', <O extends ObjA>() => {
		expect.assertions(0)

		type A0 = Pick<O, 'a'>
		Assert.is<O, A0>()

		type A1 = VPick<O, 'a'>
		Assert.is<O, A1>()
	})

	it('generic + signatures', <O extends Obj>() => {
		expect.assertions(0)

		type B0 = Pick<O, 'a'>
		Assert.is<O, B0>()

		type B1 = VPick<O, 'a'>
		Assert.is<O, B1>()

		//

		// type A0 = Pick<O, 'a' | symbol>
		// Assert.is<O, A0>() // bad!

		type A1 = VPick<O, 'a' | symbol>
		// TODO does not work!
		// @ts-expect-error does not work!
		Assert.is<O, A1>()

		//

		type C0 = Pick<O, number | 'a'>
		Assert.is<O, C0>()

		type C1 = VPick<O, number | 'a'>
		// TODO does not work!
		// @ts-expect-error does not work!
		Assert.is<O, C1>()
	})

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type Obj = {
			a: 1
			b: 2
		}
		const obj = {} as unknown as VPick<Obj, 'a'>
		// hit F12 here:
		void obj.a
	})
})
