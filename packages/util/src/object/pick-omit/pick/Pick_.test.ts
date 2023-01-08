// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type'

import type { OmitSignatures } from '../omit'
import type { $Pick_, Pick_ } from './Pick_'

describe('Pick', () => {
	it('type', () => {
		expect.assertions(0)

		type B = Pick_<{ 2: 2; readonly a?: 1 }, string>
		$Assert<IsIdentical<B, { readonly a?: 1 }>>()

		type A = Pick_<{ readonly a?: 1; b: 2 }, 'a'>
		$Assert<IsIdentical<A, { readonly a?: 1 }>>()
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
		$Assert<IsIdentical<A0, { a: 1 }>>()

		type A1 = Pick_<Obj, 'a'>
		$Assert<IsIdentical<A1, { a: 1 }>>()

		//

		type B0 = Pick<Obj, 'a' | symbol>
		$Assert<IsIdentical<B0, { [k: symbol]: 3; a: 1 }>>()

		type B1 = Pick_<Obj, 'a' | symbol>
		$Assert<IsIdentical<B1, { [k: symbol]: 3; a: 1 }>>()

		//

		// type C0 = Pick<Obj, string>
		// Assert<IsIdentical<C0, { [k: string]: 1 | 2; a: 1 }>>() // bad!

		// type C1 = Pick_<Obj, string>
		// Assert<IsIdentical<C1, { [k: string]: 1 | 2; a: 1 }>>() // bad!
	})

	it('generic', <O extends Obj>() => {
		expect.assertions(0)

		type A0 = Pick<O, 'a' | symbol>
		$Assert.is<A0, Obj>()

		type A1 = $Pick_<O, 'a' | symbol>
		$Assert.is<A1, Obj>()

		// type C0 = Pick<O, string>
		// Assert.is<C0, Obj>() // bad!

		// type C1 = Pick_<O, string>
		// Assert.is<C1, Obj>() // bad!
	})

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type Obj = {
			a: 1
			b: 2
		}
		const obj = {} as unknown as Pick_<OmitSignatures<Obj>, 'a'>
		// hit F12 here:
		void obj.a
	})
})
