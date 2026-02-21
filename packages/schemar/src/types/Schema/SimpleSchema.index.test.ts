// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import { describe, it } from 'vitest'

import type { Schema } from '~'

describe('SimpleSchema', () => {
	it('index signatures', () => {
		type A = { a: 1 }
		type B = { [k: string]: number }

		/** This likes to break with interfaces */
		$Assert.is<Schema<A>, Schema<B>>()

		/** Vscode should hover with just `SimpleSchema` - as with type aliases */
		type C = Schema<A>

		/** Unused `C` */
		void 0 as unknown as C
	})
})
