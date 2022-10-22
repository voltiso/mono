// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~'
import { $Assert } from '~/$strip'

import type { PickByValue } from './PickByValue'

describe('PickByValue', () => {
	it('type', () => {
		expect.assertions(0)

		type A = PickByValue<{ readonly a?: 'a'; b: 'b' }, unknown>
		$Assert<IsIdentical<A, { readonly a?: 'a'; b: 'b' }>>()

		type B = PickByValue<{ readonly a?: 'a'; b: 'b' }, 'a'>
		$Assert<IsIdentical<B, { readonly a?: 'a' }>>()
	})

	type ObjA = {
		readonly a?: 'aa'
		b: 'bb'
	}

	it('generic', <O extends ObjA>() => {
		expect.assertions(0)

		type A = PickByValue<O, 'aa'>
		$Assert.is<O, A>()
	})

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type Obj = {
			readonly a?: 'aa'
			b: 'bb'
		}
		const obj = {} as unknown as PickByValue<Obj, 'aa'>
		// hit F12 here:
		void obj.a
	})
})
