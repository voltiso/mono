// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type'

import type { PickSimple } from './PickSimple'

describe('PickSimple', () => {
	it('type', () => {
		expect.assertions(0)

		type A = PickSimple<{ readonly a?: 1; b: 2 }, 'a'>
		$Assert<IsIdentical<A, { readonly a?: 1 }>>()
	})

	type ObjA = {
		readonly a?: 1
		b: 2
	}

	it('generic', <O extends ObjA>() => {
		expect.assertions(0)

		type A0 = Pick<O, 'a'>
		$Assert.is<O, A0>()

		// type A1 = PickSimple<O, 'a'>
		// Assert.is<O, A1>()

		// type A2 = PickSimple_<O, 'a'>
		// Assert.is<O, A2>()
	})

	it('discards index signatures', () => {
		expect.assertions(0)

		const sym = Symbol('sym')

		type A = PickSimple<
			{
				[k: string]: number
				[k: number]: 1
				[k: symbol]: 'a'
				3: 1
				readonly a?: 33
				b: 44
				[sym]: 'a'
			},
			string
		>
		$Assert<IsIdentical<A, { readonly a?: 33; b: 44 }>>()
	})

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type Obj = {
			a: 1
			b: 2
		}
		const obj = {} as unknown as PickSimple<Obj, 'a'>
		// hit F12 here:
		void obj.a
	})
})
