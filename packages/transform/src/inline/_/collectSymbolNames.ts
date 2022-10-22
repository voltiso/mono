// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as ts from 'typescript'

export function collectSymbolNames(node: ts.Node): Set<string> {
	const result = new Set<string>()

	if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName)) {
		result.add(node.typeName.text)
	}

	node.forEachChild(child => {
		const newSymbols = collectSymbolNames(child)
		for (const newSymbol of newSymbols) result.add(newSymbol)
	})

	// locally declared symbols
	if (ts.isMappedTypeNode(node)) {
		result.delete(node.typeParameter.name.text)
	}

	return result
}
