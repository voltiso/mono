// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as ts from 'typescript'

export function hasNodeOfType(node: ts.Node, kind: ts.SyntaxKind): boolean {
	if (node.kind === kind) return true

	let result = false

	node.forEachChild(child => {
		const hasChildNodeOfType = hasNodeOfType(child, kind)
		if (hasChildNodeOfType) result = true
	})

	return result
}
