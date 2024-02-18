// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as ts from 'typescript'

import type { TransformContext } from './TransformContext.js'

export function getNodeText(
	ctx: TransformContext,
	node: ts.Node,
): string | undefined {
	try {
		return node.getText(ctx.sourceFile).replace(/\s+/gu, ' ')
	} catch {
		return undefined
	}
}
