// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { SimpleSchema } from '~'

describe('SimpleSchema', () => {
	it('index signatures', () => {
		type A = { a: 1 }
		type B = { [k: string]: number }

		/** This likes to break with interfaces */
		$Assert.is<SimpleSchema<A>, SimpleSchema<B>>()

		/** Vscode should hover with just `SimpleSchema` - as with type aliases */
		type C = SimpleSchema<A>

		/** Unused `C` */
		void 0 as unknown as C
	})
})
