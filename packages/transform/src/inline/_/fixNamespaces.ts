// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransformContext } from '@voltiso/transform.lib'
import * as ts from 'typescript'

import { buildNestedQualifiedName } from './buildNestedQualifiedName.js'
import { getSymbolPath } from './getSymbolPath.js'
import type { SymbolObject } from './SymbolObject'

// function isSynthesizedTypeReferenceNode(
// 	node: ts.Node,
// ): node is ts.TypeReferenceNode {
// 	const result =
// 		!!(node.flags & ts.NodeFlags.Synthesized) &&
// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
// 		(node as any).typeName?.symbol !== undefined

// 	// if (result) console.log('\n\n FOUND SYNTHESIZED NODE', node, '\n\n')

// 	return result
// }

/** Transform `A` into `Namespace.Nested.A` */
export function fixNamespaces(ctx: TransformContext, node: ts.Node): ts.Node {
	function visitor(node: ts.Node): ts.Node {
		// console.log(
		// 	'visit',
		// 	stringFromSyntaxKind(node.kind),
		// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		// 	(node as any).escapedText || (node as any).name?.escapedText,
		// 	{
		// 		isTypeReference: ts.isTypeReferenceNode(node),
		// 		// isSynthesized: isSynthesizedTypeReferenceNode(node),
		// 	},
		// )

		if (ts.isIdentifier(node)) {
			// console.log('!!! found identifier', node)

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const symbol = (node as any).symbol as SymbolObject | undefined

			if (!symbol) return node

			const symbolPath = getSymbolPath(symbol)
			// console.log('identifier symbol path', symbolPath, symbol)
			const nestedQualifiedName = buildNestedQualifiedName(symbolPath)
			return nestedQualifiedName
		}

		// if (ts.isTypeReferenceNode(node)) {
		// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
		// 	const symbolPath = getSymbolPath((node.typeName as any).symbol)
		// 	if (symbolPath.length === 0) return node

		// 	const nestedQualifiedName = buildNestedQualifiedName(symbolPath)

		// 	let typeArguments: ts.NodeArray<ts.TypeNode> | undefined

		// 	if (node.typeArguments) {
		// 		console.log('!!! call nested')
		// 		typeArguments = ts.factory.createNodeArray(
		// 			node.typeArguments.map(typeArgument =>
		// 				ts.visitEachChild(typeArgument, visitor, ctx.transformationContext),
		// 			),
		// 		)
		// 		console.log('!!! call nested end')
		// 	}

		// 	// console.log(
		// 	// 	'ts.factory.createTypeReferenceNode',
		// 	// 	symbolPath.join('.'),
		// 	// 	typeArguments,
		// 	// )

		// 	const newNode = ts.factory.createTypeReferenceNode(
		// 		nestedQualifiedName,
		// 		typeArguments,
		// 	)

		// 	// console.log('transform', getNodeText(ctx, node), '->', getNodeText(ctx, newNode))

		// 	return newNode
		// }

		return ts.visitEachChild(node, visitor, ctx.transformationContext)
	}

	return ts.visitEachChild(node, visitor, ctx.transformationContext)
}
