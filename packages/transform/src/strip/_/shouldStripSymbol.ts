// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as ts from 'typescript'

import type { StripTransformContext } from '../stripTransform'

export function shouldStripSymbol(
	ctx: StripTransformContext,
	symbol: ts.Symbol,
): boolean {
	for (const symbolToStrip of ctx.options.symbols || [])
		if (symbolToStrip === symbol.name) return true

	// eslint-disable-next-line no-bitwise
	if (symbol.flags & ts.SymbolFlags.Alias) {
		// eslint-disable-next-line no-param-reassign
		symbol = ctx.typeChecker.getAliasedSymbol(symbol)
	}

	const tags = symbol.getJsDocTags()

	for (const tag of tags) if (tag.name === 'strip') return true

	return false
}
