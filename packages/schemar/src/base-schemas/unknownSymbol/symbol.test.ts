// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomUnknownSymbol,
	IUnknownSymbol,
	Output,
	UnknownSymbolOptions,
} from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('symbol', () => {
	it('generic', <O extends UnknownSymbolOptions>() => {
		expect.assertions(0)

		$Assert.is<CustomUnknownSymbol<O>, IUnknownSymbol>()
	})

	it('simple', () => {
		expect.hasAssertions()

		type A = Output<typeof s.symbol>
		$Assert<IsIdentical<A, symbol>>()

		expect(s.symbol.extends(s.symbol)).toBeTruthy()
		expect(s.symbol.extends(null)).toBeFalsy()
		expect(s.symbol.extends(s.unknown)).toBeTruthy()
		expect(s.symbol.extends(s.number)).toBeFalsy()

		const sym = Symbol('sym')

		expect(s.symbol(sym).extends(s.symbol)).toBeTruthy()
		expect(s.symbol(sym).extends(s.symbol(sym))).toBeTruthy()
		expect(s.symbol.extends(s.symbol(sym))).toBeFalsy()

		expect(s.symbol.isValid(123)).toBeFalsy()
		expect(s.symbol.isValid(Symbol('test'))).toBeTruthy()
	})
})
