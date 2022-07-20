// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '../static-assert'
import type { Tokenize } from './tokenize.js'

describe('tokenize', () => {
	it('works', () => {
		expect.assertions(0)

		Assert.is<
			Tokenize<'isString 1 & !isString 2'>,
			['isString', '1', '&', '!', 'isString', '2']
		>()
	})
})
