// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as ts from 'typescript'

export function collectValueSymbolNames(node: ts.Node): Set<string> {
	const result = new Set<string>()

	if (ts.isTypeQueryNode(node)) {
		let currentNode = node.exprName
		while (ts.isQualifiedName(currentNode)) {
			currentNode = currentNode.left
		}
		if (ts.isIdentifier(currentNode)) {
			result.add(currentNode.text)
		}
	}

	node.forEachChild(child => {
		const newSymbols = collectValueSymbolNames(child)
		for (const newSymbol of newSymbols) {
			result.add(newSymbol)
		}
	})

	return result
}
