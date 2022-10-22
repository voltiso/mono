// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~'
import { $Assert } from '~/$strip'

import type { OmitRequired } from './OmitRequired'

describe('OmitRequired', () => {
	it('type', () => {
		expect.assertions(0)

		type A = OmitRequired<{ readonly a?: 'a'; b: 'b' }>
		$Assert<IsIdentical<A, { readonly a?: 'a' }>>()
	})

	type ObjA = {
		readonly a?: 'aa'
		b: 'bb'
	}

	it('generic', <O extends ObjA>() => {
		expect.assertions(0)

		type A = OmitRequired<O>
		$Assert.is<O, A>()
	})

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type Obj = {
			readonly a?: 'aa'
			b: 'bb'
		}
		const obj = {} as unknown as OmitRequired<Obj>
		// hit F12 here:
		void obj.a
	})
})
