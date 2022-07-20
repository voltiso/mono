// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { GetOutputType } from '../../GetType'
import type { IRootSchema } from '../../schema'
import * as s from '..'
import { number } from '../number'
import { unknown } from '../unknown'
import type { SymbolOptions } from './_/SymbolOptions.js'
import type { CustomSymbol } from './CustomSymbol.js'
import type { ISymbol } from './ISymbol.js'

describe('symbol', () => {
	it('generic', <O extends SymbolOptions>() => {
		expect.assertions(0)

		Assert.is<ISymbol<O>, ISymbol>()
		Assert.is<CustomSymbol<O>, ISymbol<O>>()
		Assert.is<CustomSymbol<O>, ISymbol>()
	})

	it('simple', () => {
		expect.hasAssertions()

		Assert.is<typeof s.symbol, IRootSchema>()

		type A = GetOutputType<typeof s.symbol>
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
