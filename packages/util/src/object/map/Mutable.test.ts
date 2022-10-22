// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~/$strip'
import { $Assert } from '~/$strip'

import type { Mutable } from './Mutable'

describe('Mutable', () => {
	it('type', () => {
		expect.assertions(0)

		type A = { a: 'aa'; b?: 'bb'; readonly c: 'cc'; readonly d?: 'dd' }
		type AA = Mutable<A>
		$Assert<IsIdentical<AA, { a: 'aa'; b?: 'bb'; c: 'cc'; d?: 'dd' }>>()
	})
})
