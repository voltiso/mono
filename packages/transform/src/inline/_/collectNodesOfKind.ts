// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as ts from 'typescript'

export function collectNodesOfKind(
	node: ts.Node,
	kind: ts.SyntaxKind,
): ts.Node[] {
	let nodesOfKind: ts.Node[] = []

	if (node.kind === kind) nodesOfKind.push(node)

	node.forEachChild(child => {
		const moreNodesOfKind = collectNodesOfKind(child, kind)
		nodesOfKind = [...nodesOfKind, ...moreNodesOfKind]
	})

	return nodesOfKind
}
