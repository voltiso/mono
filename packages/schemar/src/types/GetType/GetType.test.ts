// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical, Newable } from '@voltiso/util'
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
		$Assert<
			IsIdentical<C, {} | InferableLiteral | readonly unknown[] | Newable>
		>()

		type D = Type<{}>

		/**
		 * ! Inferable object - infers to `{}` to avoid assignability issues
		 *
		 * - Use `.plain` to mark plain object and intersect resulting type with
		 *   `object`
		 */
		$Assert<IsIdentical<D, {}>>()
	})
})
