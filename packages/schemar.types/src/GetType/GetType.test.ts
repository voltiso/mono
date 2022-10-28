// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { $$Schema, $$Schemable, Inferable, InferableLiteral } from '~'

import type { Type } from './GetType'

describe('Type', () => {
	it('type', () => {
		type A = Type<$$Schema>
		$Assert<IsIdentical<A, unknown>>()

		type B = Type<$$Schemable>
		$Assert<IsIdentical<B, unknown>>()

		type C = Type<Inferable>
		$Assert<IsIdentical<C, object | InferableLiteral | readonly unknown[]>>()

		type D = Type<{}>
		$Assert<IsIdentical<D, object>>() //! Inferable object - should not infer to {}
	})
})
