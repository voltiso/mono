// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as ts from 'typescript'

import { getJsDocTagNames } from '~/_'

import type { StripTransformContext } from '../stripTransform.js'

export function shouldStripSymbol(
	ctx: StripTransformContext,
	symbol: ts.Symbol,
): boolean {
	for (const symbolToStrip of ctx.options.symbols || [])
		if (symbolToStrip === symbol.name) return true

	const tags = getJsDocTagNames(ctx, symbol)

	// console.log('! tags', symbol.name, tags)
	// console.log('! symbol', symbol)

	return tags.includes('strip')
}
