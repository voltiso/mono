// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as ts from 'typescript'

import { getSymbolPath } from './getSymbolPath'
import type { SymbolObject } from './SymbolObject'

function isWithTypeParameters(node: ts.Node): node is {
	typeParameters: ts.NodeArray<ts.TypeParameterDeclaration>
} & ts.Node {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	return !!(node as any)?.typeParameters
}

export function collectSymbolNames(node: ts.Node): Set<string> {
	const result = new Set<string>()

	if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName)) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
		const symbol: SymbolObject = (node.typeName as any)?.symbol

		result.add(getSymbolPath(symbol)[0] || node.typeName.text)
	}

	const typeParameters = isWithTypeParameters(node)
		? node.typeParameters
		: ([] as never)

	const typeParameterNames = new Set(
		typeParameters.map(typeParameter =>
			typeParameter.name.escapedText.toString(),
		),
	)

	// console.log({ typeParameterNames })

	node.forEachChild(child => {
		const newSymbols = collectSymbolNames(child)
		for (const newSymbol of newSymbols) {
			if (typeParameterNames.has(newSymbol)) continue

			result.add(newSymbol)
		}
	})

	// locally declared symbols
	if (ts.isMappedTypeNode(node)) {
		result.delete(node.typeParameter.name.text)
	}

	return result
}
