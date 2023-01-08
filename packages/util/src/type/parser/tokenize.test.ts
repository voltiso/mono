// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'

import type { Tokenize } from './tokenize'

describe('tokenize', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert.is<
			Tokenize<'isString 1 & !isString 2'>,
			['isString', '1', '&', '!', 'isString', '2']
		>()
	})
})
