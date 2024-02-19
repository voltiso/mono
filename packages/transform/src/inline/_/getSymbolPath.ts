// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as ts from 'typescript'

import type { SymbolObject } from './SymbolObject.js'

export function getSymbolPath(symbol: SymbolObject | undefined): string[] {
	if (!symbol) return []

	if (
		// eslint-disable-next-line no-bitwise
		(symbol.parent?.flags ?? ts.SymbolFlags.ValueModule) &
		ts.SymbolFlags.ValueModule
	) {
		return [symbol.escapedName]
	}

	return [...getSymbolPath(symbol.parent), symbol.escapedName]
}
