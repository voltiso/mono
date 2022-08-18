// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { stringFromSyntaxKind } from '@voltiso/transform.lib'
// import { strict as assert } from 'node:assert'
import { stringFromSyntaxKind } from '@voltiso/transform.lib'
import chalk from 'chalk'
import * as ts from 'typescript'

export function voltisoTransform(program: ts.Program, _pluginOptions: {}) {
	const typeChecker = program.getTypeChecker()

	function simplifyNode(node: ts.Node): ts.Node {
		const type = typeChecker.getTypeAtLocation(node)

		const aliasTypeArguments = type.aliasTypeArguments || []

		if (aliasTypeArguments.length === 0) {
			delete type.aliasSymbol
			delete type.aliasTypeArguments
		}

		// if (ts.isTypeReferenceNode(node)) {
		// 	// 	const outerType = typeChecker.getTypeAtLocation(node.parent)
		// 	// console.log('!!!!!!!!!!!!!!', { type, outerType })
		// 	// delete type.aliasSymbol
		// }

		const typeNode: ts.Node | undefined = typeChecker.typeToTypeNode(
			type,
			undefined,
			ts.NodeBuilderFlags.NoTruncation,
		)
		if (!typeNode) return node

		// while (
		// 	ts.isTypeReferenceNode(typeNode) &&
		// 	(typeNode.typeArguments || []).length === 0
		// ) {
		// 	typeNode
		// }

		if (typeNode.kind === ts.SyntaxKind.AnyKeyword) return node

		return typeNode
	}

	function collectSymbols(node: ts.Node): ts.Symbol[] {
		let result = [] as ts.Symbol[]

		const type = typeChecker.getTypeAtLocation(node)
		const symbol = type.symbol as ts.Symbol | undefined
		if (symbol) result = [...result, symbol]

		node.forEachChild(child => {
			result = [...result, ...collectSymbols(child)]
		})

		return result
	}

	function collectSymbolNames(node: ts.Node): Set<string> {
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

	function getJSDocTags(type: ts.Type): readonly ts.JSDocTag[] {
		const symbol = type.symbol as ts.Symbol | undefined
		// console.log('getJSDocTags', typeChecker.typeToString(type))

		const declaration = symbol?.declarations?.[0]
		if (!declaration) return []

		let originalNode = ts.getOriginalNode(declaration) as ts.Node | undefined

		for (;;) {
			if (!originalNode) return []

			if (
				ts.isTypeParameterDeclaration(originalNode) ||
				ts.isTypeAliasDeclaration(originalNode)
			)
				break

			originalNode = originalNode.parent
		}

		//

		return ts.getJSDocTags(originalNode)
	}

	// function hasPropertyJSDocInlineTag(
	// 	objectType: ts.TypeNode,
	// 	indexType: ts.TypeNode,
	// ) {
	// 	if (!ts.isTypeReferenceNode(objectType)) return false
	// 	if (!ts.isLiteralTypeNode(indexType)) return false

	// 	console.log(
	// 		'hasPropertyJSDocInlineTag',
	// 		objectType.getText(),
	// 		indexType.getText(),
	// 	)

	// 	const type = typeChecker.getTypeAtLocation(objectType)
	// 	const symbol = type.symbol
	// 	const declaration = symbol.declarations?.[0]

	// 	const originalNode = ts.getOriginalNode(declaration)
	// 	if (!originalNode) return false

	// 	console.log('originalNode', stringFromSyntaxKind(originalNode.kind))

	// 	if (ts.isInterfaceDeclaration(originalNode)) {
	// 		for (const member of originalNode.members) {
	// 			// console.log(
	// 			// 	'member',
	// 			// 	member.getText(),
	// 			// 	stringFromSyntaxKind(member.kind),
	// 			// )

	// 			assert(ts.isIdentifier(member.name!))

	// 			console.log(
	// 				'member name',
	// 				member.name.getText(),
	// 				stringFromSyntaxKind(member.name.kind),
	// 				stringFromSyntaxKind(indexType.literal.kind),
	// 			)

	// 			if (member.name === indexType.literal) {
	// 				const propertyType = typeChecker.getTypeAtLocation(member)
	// 				console.log('propertyType', typeChecker.typeToString(propertyType))
	// 				const result = hasJSDocInlineTag(propertyType)
	// 				if (result) return true
	// 			}
	// 		}
	// 	}

	// 	// let child: ts.Node | undefined

	// 	// objectType.forEachChild(currentChild => {
	// 	// 	console.log('child', ts.getOriginalNode(currentChild).parent.getText())
	// 	// 	// console.log('child', stringFromSyntaxKind(currentChild.kind))
	// 	// 	child = currentChild
	// 	// })

	// 	// if (!child) return false

	// 	// const tags = ts.getJSDocTags(child)

	// 	// for (const tag of tags) if (tag.tagName.text === 'inline') return true

	// 	return false
	// }

	function hasJSDocTag(type: ts.Type, tagName: string) {
		const tags = getJSDocTags(type)
		for (const tag of tags) if (tag.tagName.text === tagName) return true
		return false
	}

	function hasJSDocInlineTag(type: ts.Type) {
		return hasJSDocTag(type, 'inline')
	}

	// function hasNodeJSDocInlineTag(node: ts.Node) {
	// 	const tags = ts.getJSDocTags(node)
	// 	console.log('tags', tags)
	// 	for(const tag of tags) if(tag.tagName.text === 'inline') return true
	// 	return false
	// }

	// function canBeSimplified(node: ts.Node): boolean {
	// 	return (
	// 		(ts.isIndexedAccessTypeNode(node) &&
	// 			hasPropertyJSDocInlineTag(node.objectType, node.indexType)) ||
	// 		ts.isConditionalTypeNode(node) ||
	// 		(ts.isTypeReferenceNode(node) &&
	// 			hasJSDocInlineTag(typeChecker.getTypeAtLocation(node)) &&
	// 			canBeInlined(node))
	// 	)
	// }

	function getNodePositionStr(node: ts.Node) {
		// eslint-disable-next-line no-param-reassign
		node = ts.getOriginalNode(node)
		const sourceFile = node.getSourceFile()
		const lineCol = ts.getLineAndCharacterOfPosition(sourceFile, node.pos)
		return `${sourceFile.fileName}:${lineCol.line + 1}:${lineCol.character + 1}`
	}

	return (ctx: ts.TransformationContext) => (sourceFile: ts.SourceFile) => {
		const typeSymbols = new Set(
			typeChecker
				.getSymbolsInScope(
					sourceFile,
					// eslint-disable-next-line no-bitwise
					ts.SymbolFlags.Type |
						ts.SymbolFlags.Class |
						ts.SymbolFlags.Interface |
						ts.SymbolFlags.ModuleMember,
				)
				.map(symbol => symbol.name),
		)

		function getNodeText(node: ts.Node): string | undefined {
			try {
				return node.getText(sourceFile)
			} catch {
				return undefined
			}
		}

		function getNodeFullText(node: ts.Node): string | undefined {
			try {
				return node.getFullText(sourceFile)
			} catch {
				return undefined
			}
		}

		function simplifyAndAddComment(originalNode: ts.Node): ts.Node {
			let node = originalNode
			node = simplifyNode(node)
			const comment = getNodeText(ts.getOriginalNode(originalNode))
			if (comment)
				node = ts.addSyntheticLeadingComment(
					node,
					ts.SyntaxKind.MultiLineCommentTrivia,
					comment,
				)
			return node
		}

		function hasNodeOfType(node: ts.Node, kind: ts.SyntaxKind): boolean {
			if (node.kind === kind) return true

			let result = false

			node.forEachChild(child => {
				const hasChildNodeOfType = hasNodeOfType(child, kind)
				if (hasChildNodeOfType) result = true
			})

			return result
		}

		function canBeInlined(node: ts.Node): boolean {
			// console.log('canBeInlined?', stringFromSyntaxKind(node.kind))

			const symbols = collectSymbols(node)

			for (const symbol of symbols) {
				const declaration = symbol.declarations?.[0]
				if (!declaration) return false // unresolved

				if (declaration.kind === ts.SyntaxKind.TypeParameter) return false
			}

			const newNode = simplifyNode(node)
			if (hasNodeOfType(newNode, ts.SyntaxKind.MappedType)) return false

			const newSymbolNames = collectSymbolNames(newNode)

			// console.log(newSymbolNames)

			const symbolNames = collectSymbolNames(node)
			for (const symbolName of symbolNames) newSymbolNames.delete(symbolName)

			// console.log('remaining symbols', newSymbolNames)

			for (const symbol of newSymbolNames) {
				if (typeSymbols.has(symbol)) newSymbolNames.delete(symbol)
			}

			const canBeInlined = newSymbolNames.size === 0

			if (!canBeInlined) {
				const message = `\n[@voltiso/transform] unable to inline ${
					getNodeText(node) || stringFromSyntaxKind(node.kind)
				} - symbols out of scope: ${[...newSymbolNames].join(
					', ',
				)} \n  @ ${getNodePositionStr(node)}`

				// eslint-disable-next-line no-console
				console.warn(chalk.bgRed(message))
			}

			return canBeInlined
		}

		// function canTargetBeInlined(node: ts.Node): boolean {
		// 	// console.log()
		// 	// console.log('canTargetBeInlined', getNodeText(node))

		// 	// node = simplifyNode(node)

		// 	// console.log('!!!!!', symbols)

		// 	// return true

		// 	const type = typeChecker.getTypeAtLocation(node)

		// 	console.log()
		// 	console.log('canTargetBeInlined', getNodeText(node))
		// 	console.log('type is', typeChecker.typeToString(type))

		// 	const symbols = collectSymbols(node)
		// 	console.log('symbols', symbols)

		// 	const newNode = simplifyNode(node)

		// 	console.log('new node is', stringFromSyntaxKind(newNode.kind))

		// 	const newSymbols = collectSymbols(newNode)
		// 	console.log('new symbols', newSymbols)

		// 	return true

		// 	// for (const symbol of symbols) {
		// 	// 	const id = (symbol as { id?: number }).id
		// 	// 	if (id === undefined) continue

		// 	// 	const declaration = symbol.declarations?.[0]
		// 	// 	if (!declaration) {
		// 	// 		// console.log('no declaration', symbol.name)
		// 	// 		return false
		// 	// 	}

		// 	// 	if (ts.isTypeParameterDeclaration(declaration)) continue

		// 	// 	// console.log('check symbol', declaration.getText())

		// 	// 	if (!typeSymbolIds.has(id)) {
		// 	// 		console.log({ typeSymbolIds, symbol })
		// 	// 		return false
		// 	// 	}
		// 	// }
		// 	// return true
		// }

		function hasNodeInlineComment(node: ts.Node): boolean {
			const nodeFullText = getNodeFullText(node)
			if (nodeFullText === undefined) return false

			const commentRanges = ts.getLeadingCommentRanges(nodeFullText, 0) || []
			for (const commentRange of commentRanges) {
				if (commentRange.kind !== ts.SyntaxKind.MultiLineCommentTrivia) continue
				// eslint-disable-next-line unicorn/prefer-set-has
				const comment = nodeFullText.slice(commentRange.pos, commentRange.end)
				// console.log(`COMMENT: "${comment}"`)
				const validInlineComments = ['@inline', '@__INLINE__', '#__INLINE__']
				for (const validInlineComment of validInlineComments)
					if (comment.includes(validInlineComment)) return true
			}
			return false
		}

		function visitor(originalNode: ts.Node): ts.Node {
			let node = originalNode

			// console.log('VISIT', node.getText(sourceFile))

			if (ts.isTypeNode(node) && hasNodeInlineComment(node)) {
				// const type = typeChecker.getTypeAtLocation(node)
				if (canBeInlined(node)) {
					// eslint-disable-next-line no-console
					console.log(
						'\n',
						'[@voltiso/transform] inlining type expression:',
						getNodeText(originalNode),
						'\n  @',
						getNodePositionStr(originalNode),
					)
					node = simplifyAndAddComment(node)
				} else {
					// // eslint-disable-next-line no-console
					// console.warn(
					// 	`[@voltiso/transform] type expression cannot be inlined: ${
					// 		getNodeText(originalNode) || stringFromSyntaxKind(node.kind)
					// 	} @ ${getNodePositionStr(originalNode)}`,
					// )
				}
			} else if (ts.isTypeReferenceNode(node)) {
				const type = typeChecker.getTypeAtLocation(node)
				if (hasJSDocInlineTag(type) && canBeInlined(node)) {
					// eslint-disable-next-line no-console
					console.log(
						'\n',
						'[@voltiso/transform] inlining type alias:',
						getNodeText(originalNode) || stringFromSyntaxKind(node.kind),
						'\n  @',
						getNodePositionStr(originalNode),
					)
					node = simplifyAndAddComment(node)
				}
			}

			// const simplifyNodeResult = simplifyNode(originalNode)

			// if (
			// 	simplifyNodeResult &&
			// 	!isSameNode(originalNode, simplifyNodeResult.node)
			// ) {
			// 	// eslint-disable-next-line no-console
			// 	console.log(
			// 		chalk.red(syntaxKindToString(originalNode.kind)),
			// 		'=>',
			// 		chalk.green(syntaxKindToString(simplifyNodeResult.node.kind)),
			// 	)

			// 	const beforeStr = getNodeText(originalNode)
			// 	const afterStr = typeChecker.typeToString(simplifyNodeResult.type)

			// 	// eslint-disable-next-line no-console
			// 	console.log(chalk.red(` - ${beforeStr}`))
			// 	// eslint-disable-next-line no-console
			// 	console.log(chalk.green(` + ${afterStr}`))
			// 	// eslint-disable-next-line no-console
			// 	console.log()
			// }

			return ts.visitEachChild(node, visitor, ctx)
		}

		return ts.visitEachChild(sourceFile, visitor, ctx)
	}
}
