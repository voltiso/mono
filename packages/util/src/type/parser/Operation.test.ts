// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '~/type/static-assert'

import type { Default, Unset } from './Operation'

describe('def', () => {
	it('works', () => {
		expect.assertions(0)

		Assert.is<Default<Unset, 123>, 123>()
		Assert.is<Default<1, 2>, 1>()
	})
})
