// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IsIdentical } from '~/type'

import type { Mutable } from './Mutable'

describe('Mutable', () => {
	it('type', () => {
		expect.assertions(0)

		type A = { a: 'aa'; b?: 'bb'; readonly c: 'cc'; readonly d?: 'dd' }
		type AA = Mutable<A>
		$Assert<IsIdentical<AA, { a: 'aa'; b?: 'bb'; c: 'cc'; d?: 'dd' }>>()
	})
})
