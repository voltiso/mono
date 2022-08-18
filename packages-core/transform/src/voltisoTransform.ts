// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

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

		const typeNode: ts.Node | undefined = typeChecker.typeToTypeNode(
			type,
			undefined,
			ts.NodeBuilderFlags.NoTruncation,
		)
		if (!typeNode) return node

		if (typeNode.kind === ts.SyntaxKind.AnyKeyword) return node

		return typeNode
	}

	// function collectSymbols(node: ts.Node): ts.Symbol[] {
	// 	let result = [] as ts.Symbol[]

	// 	const type = typeChecker.getTypeAtLocation(node)
	// 	const symbol = type.symbol as ts.Symbol | undefined
	// 	if (symbol) result = [...result, symbol]

	// 	node.forEachChild(child => {
	// 		result = [...result, ...collectSymbols(child)]
	// 	})

	// 	return result
	// }

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

	// function getJSDocTags(type: ts.Type): readonly ts.JSDocTag[] {
	// 	const symbol = type.symbol as ts.Symbol | undefined
	// 	// console.log('getJSDocTags', typeChecker.typeToString(type))

	// 	const declaration = symbol?.declarations?.[0]
	// 	if (!declaration) return []

	// 	let originalNode = ts.getOriginalNode(declaration) as ts.Node | undefined

	// 	for (;;) {
	// 		if (!originalNode) return []

	// 		if (
	// 			ts.isTypeParameterDeclaration(originalNode) ||
	// 			ts.isTypeAliasDeclaration(originalNode)
	// 		)
	// 			break

	// 		originalNode = originalNode.parent
	// 	}

	// 	//

	// 	return ts.getJSDocTags(originalNode)
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
				return node.getText(sourceFile).replaceAll(/\s+/g, ' ')
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
					` ${comment} `,
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

			// const symbols = collectSymbols(node)

			// for (const symbol of symbols) {
			// 	const declaration = symbol.declarations?.[0]
			// 	if (!declaration) return false // unresolved

			// 	if (declaration.kind === ts.SyntaxKind.TypeParameter) return false
			// }

			const newNode = simplifyNode(node)
			if (hasNodeOfType(newNode, ts.SyntaxKind.MappedType)) {
				// console.warn('not inlining mapped types')
				return false
			}

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
				}
			} else if (
				ts.isTypeReferenceNode(node) ||
				ts.isIndexedAccessTypeNode(node) ||
				ts.isTypeQueryNode(node)
			) {
				const symbolNode = ts.isTypeReferenceNode(node)
					? node.typeName
					: ts.isIndexedAccessTypeNode(node)
					? node.indexType.getChildAt(0)
					: ts.isTypeQueryNode(node)
					? node.exprName
					: node

				let symbol = typeChecker.getSymbolAtLocation(symbolNode)

				// if (symbol) console.log('found symbol', symbol.name)

				// if (ts.isTypeReferenceNode(node))
				// 	console.log(
				// 		'found TypeReferenceNode',
				// 		getNodeText(originalNode),
				// 		symbol?.name,
				// 	)

				if (symbol) {
					// eslint-disable-next-line no-bitwise
					if (symbol.flags & ts.SymbolFlags.Alias) {
						symbol = typeChecker.getAliasedSymbol(symbol)
					}

					const tags = symbol.getJsDocTags()
					const hasInlineTag = tags.map(tag => tag.name).includes('inline')

					// if (hasInlineTag)
					// console.log('inline tag found at', getNodePositionStr(originalNode))

					if (hasInlineTag && canBeInlined(node)) {
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
