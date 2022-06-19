// TODO: does not work with generics!!

/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from '../../../misc/IsEqual'
import { Assert } from '../../../bdd'
import { PickPrecise } from './PickPrecise'

describe('PickPrecise', () => {
	it('type', () => {
		expect.assertions(0)

		type A = PickPrecise<{ readonly a?: 1; b: 2 }, 'a'>
		Assert<IsIdentical<A, { readonly a?: 1 }>>()
	})

	type SimpleObj = {
		readonly a?: 1
		b: 2
	}

	it('generic', <O extends SimpleObj>() => {
		expect.assertions(0)

		type A0 = Pick<O, 'a'>
		Assert.is<O, A0>()

		type A1 = PickPrecise<O, 'a'>
		// TODO
		// @ts-expect-error does not work
		Assert.is<O, A1>()

		type A2 = PickPrecise<O, 'a'>
		// TODO
		// @ts-expect-error does not work
		Assert.is<O, A2>()
	})

	type IndexedObj = {
		[k: string]: 1 | 2
		[k: number]: 2
		[k: symbol]: 3
		readonly a?: 1
	}

	it('index signatures', () => {
		expect.assertions(0)

		type A0 = Pick<IndexedObj, 'a'>
		Assert<IsIdentical<A0, { readonly a?: 1 }>>()

		type A1 = PickPrecise<IndexedObj, 'a'>
		Assert<IsIdentical<A1, { readonly a?: 1 }>>()

		//

		type B0 = Pick<IndexedObj, 'a' | symbol>
		Assert<IsIdentical<B0, { [k: symbol]: 3; readonly a?: 1 }>>()

		type B1 = PickPrecise<IndexedObj, 'a' | symbol>
		Assert<IsIdentical<B1, { [k: symbol]: 3; readonly a?: 1 }>>()

		//

		// type C0 = Pick<Obj, string>
		// Assert<IsIdentical<C0, { [k: string]: 1 | 2; readonly a?: 1 }>>() // bad!

		type C1 = PickPrecise<IndexedObj, string>
		Assert<IsIdentical<C1, { [k: string]: 1 | 2; readonly a?: 1 }>>() // better 8)

		//

		type D0 = Pick<IndexedObj, number>
		Assert<IsIdentical<D0, { [k: number]: 2 }>>()

		type D1 = PickPrecise<IndexedObj, number>
		Assert<IsIdentical<D1, { [k: number]: 2 }>>()
	})

	it('generic + signatures', <O extends IndexedObj>() => {
		expect.assertions(0)

		type B0 = Pick<O, 'a'>
		Assert.is<O, B0>()

		type B1 = PickPrecise<O, 'a'>
		// TODO
		// @ts-expect-error does not work
		Assert.is<O, B1>()

		//

		// type A0 = Pick<O, 'a' | symbol>
		// Assert.is<O, A0>() // bad!

		type A1 = PickPrecise<O, 'a' | symbol>
		// TODO
		// @ts-expect-error does not work
		Assert.is<O, A1>()

		//

		type C0 = Pick<O, number | 'a'>
		Assert.is<O, C0>()

		type C1 = PickPrecise<O, number | 'a'>
		// TODO
		// @ts-expect-error does not work
		Assert.is<O, C1>()
	})

	//

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type Obj = {
			a: 1
			b: 2
		}
		const obj = {} as unknown as PickPrecise<Obj, 'a'>
		// hit F12 here:
		void obj.a
	})
})
