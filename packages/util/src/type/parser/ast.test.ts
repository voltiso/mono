// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { AstFromString } from './ast'

describe('ast', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert.is<
			AstFromString<'asd 1 2 3 & !4'>,
			['&', [['asd', ['1', '2', '3']], ['!', ['4']]]]
		>()

		$Assert.is<
			AstFromString<'1 | !2 & !3'>,
			['|', ['1', ['&', [['!', ['2']], ['!', ['3']]]]]]
		>()

		$Assert.is<
			AstFromString<'(1 | 2) & 3'>,
			['&', [['|', ['1', '2']], '3']]
			//
		>()
	})
})
