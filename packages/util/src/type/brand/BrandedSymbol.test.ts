// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'

import type { IsIdentical } from '../compare'
import type { $ } from './BrandedSymbol'
import { BrandedSymbol } from './BrandedSymbol'

describe('FakeSymbol', () => {
	// eslint-disable-next-line jest/no-commented-out-tests
	// it('generic', <S extends string>() => {
	// 	$Assert.is<$$<S>, $$>()
	// })

	it('type', () => {
		const a = BrandedSymbol('a')
		const b = BrandedSymbol('b')

		expect(a.toString()).toBe('Symbol(a)')
		expect(b.toString()).toBe('Symbol(b)')

		$Assert<IsIdentical<typeof a, $<'a'>>>()

		$Assert($Is<typeof a>().not.subtypeOf<typeof b>())
		$Assert($Is<typeof b>().not.subtypeOf<typeof a>())

		//

		// const aa = BrandedSymbol('a')
	})
})
