// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, it } from '@jest/globals'

import type { Suggest } from './Suggest'

describe('Suggest', () => {
	it('works', <A>() => {
		$Assert.is<unknown, Suggest<A>>()
	})
})
