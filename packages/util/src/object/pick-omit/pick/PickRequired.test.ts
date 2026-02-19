// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { _ } from '~/object'
import type { IsIdentical } from '~/type'

import type { PickRequired } from './PickRequired'

describe('PickRequired', () => {
	it('type', () => {
		expect.assertions(0)

		type A = PickRequired<{ readonly a: 'a'; b?: 'b' }>
		$Assert<IsIdentical<A, { readonly a: 'a' }>>()
	})

	type ObjA = {
		readonly a?: 'aa'
		b: 'bb'
	}

	it('generic', <O extends ObjA>() => {
		expect.assertions(0)

		type A = PickRequired<O>
		$Assert.is<O, A>()
	})

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type Obj = {
			readonly a: 'aa'
			b?: 'bb'
		}
		const obj = {} as unknown as _<PickRequired<Obj>>
		// hit F12 here:
		void obj.a
	})

	it('undefined', () => {
		type A = PickRequired<{
			a: 123 | undefined
			b?: 123 | undefined
			c: 123
			d?: 123 | undefined
		}>

		$Assert<IsIdentical<A, { a: 123 | undefined; c: 123 }>>()
	})
})
