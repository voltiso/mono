// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '~/$strip'

import type { IsIdentical } from '../compare'
import type { SymbolBrand } from './BrandedSymbol'
import { BrandedSymbol } from './BrandedSymbol'

describe('FakeSymbol', () => {
	it('generic', <S extends string>() => {
		$Assert.is<SymbolBrand<S>, SymbolBrand>()
	})

	it('type', () => {
		const a = BrandedSymbol('a')
		const b = BrandedSymbol('b')

		expect(a.toString()).toBe('Symbol(a)')
		expect(b.toString()).toBe('Symbol(b)')

		$Assert<IsIdentical<typeof a, BrandedSymbol<'a'>>>()

		$Assert($Is<typeof a>().not.subtypeOf<typeof b>())
		$Assert($Is<typeof b>().not.subtypeOf<typeof a>())

		//

		// const aa = BrandedSymbol('a')
	})
})
