// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'

import type { Suggest } from './Suggest'

describe('Suggest', () => {
	it('works', <A>() => {
		$Assert.is<unknown, Suggest<A>>()
	})
})
