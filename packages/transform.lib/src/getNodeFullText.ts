// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as ts from 'typescript'

import type { TransformContext } from './TransformContext.js'

export function getNodeFullText(
	ctx: TransformContext,
	node: ts.Node,
): string | undefined {
	try {
		return node.getFullText(ctx.sourceFile)
	} catch {
		return undefined
	}
}
