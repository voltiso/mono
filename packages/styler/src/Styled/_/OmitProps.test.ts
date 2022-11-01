// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { OmitProps_ } from './OmitProps'

describe('OmitProps', () => {
	it('type', () => {
		expect.assertions(0)

		type A = OmitProps_<{ a: 1 }, never>
		$Assert<IsIdentical<A, { a: 1 }>>()

		type B = OmitProps_<{ a: 1 }, 'a'>
		$Assert<IsIdentical<B, {}>>()
	})
})
