// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransformContext } from '@voltiso/transform.lib'
import * as ts from 'typescript'

export function simplifyNode(
	ctx: TransformContext,
	node: ts.Node,
): ts.Node | undefined {
	const type = ctx.typeChecker.getTypeAtLocation(node)

	// const aliasTypeArguments = type.aliasTypeArguments || []

	// if (aliasTypeArguments.length === 0) {
	delete type.aliasSymbol
	delete type.aliasTypeArguments
	// }

	const oldTypeStr = node.getText(ctx.sourceFile) // getNodeText(ts.getOriginalNode(node))
	const newTypeStr = ctx.typeChecker.typeToString(type)
	const noChange = newTypeStr === oldTypeStr
	// console.log({ oldTypeStr, newTypeStr, noChange })
	if (noChange) return undefined

	if (ts.isTypeReferenceNode(node)) {
		const childType = ctx.typeChecker.getTypeAtLocation(node.typeName)
		const childTypeStr = ctx.typeChecker.typeToString(childType)
		if (childTypeStr === oldTypeStr) return undefined
	}

	try {
		const typeNode: ts.Node | undefined = ctx.typeChecker.typeToTypeNode(
			type,
			undefined,
			ts.NodeBuilderFlags.NoTruncation,
		)
		if (!typeNode) return node

		if (typeNode.kind === ts.SyntaxKind.AnyKeyword) return node

		return typeNode
	} catch {
		return node
	}
}
