// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IsEqual } from '~/type'

import type { Includes } from './Includes'

describe('Includes', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<Includes<'qwerty', 'wer'>>()
		$Assert.is<Includes<'banana', 'nano'>, false>()
		$Assert<IsEqual<Includes<string, 'asd'>, boolean>>()
		$Assert<IsEqual<Includes<'asd', string>, boolean>>()
	})
})
