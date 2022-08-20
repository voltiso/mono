// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { OutputType, SymbolOptions } from '~'
import { number, unknown } from '~'
import * as s from '~/custom-schemas'

describe('symbol', () => {
	it('generic', <_O extends SymbolOptions>() => {
		expect.assertions(0)

		// ! too deep...
		// Assert.is<CustomSymbol<O>, ISymbol>()
	})

	it('simple', () => {
		expect.hasAssertions()

		type A = OutputType<typeof s.symbol>
		Assert<IsIdentical<A, symbol>>()

		expect(s.symbol.extends(s.symbol)).toBeTruthy()
		expect(s.symbol.extends(null)).toBeFalsy()
		expect(s.symbol.extends(unknown)).toBeTruthy()
		expect(s.symbol.extends(number)).toBeFalsy()

		const sym = Symbol('sym')

		expect(s.symbol(sym).extends(s.symbol)).toBeTruthy()
		expect(s.symbol(sym).extends(s.symbol(sym))).toBeTruthy()
		expect(s.symbol.extends(s.symbol(sym))).toBeFalsy()
	})
})
