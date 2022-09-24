// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { stringFromSyntaxKind } from '@voltiso/transform.lib'
import chalk from 'chalk'
import * as ts from 'typescript'

export type VoltisoTransformOptions = {
	onInlineError?: 'fail' | undefined
}

export function voltisoTransform(
	program: ts.Program,
	pluginOptions: VoltisoTransformOptions,
) {
	const typeChecker = program.getTypeChecker()

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

	function collectNodesOfKind(node: ts.Node, kind: ts.SyntaxKind): ts.Node[] {
		let nodesOfKind: ts.Node[] = []

		if (node.kind === kind) nodesOfKind.push(node)

		node.forEachChild(child => {
			const moreNodesOfKind = collectNodesOfKind(child, kind)
			nodesOfKind = [...nodesOfKind, ...moreNodesOfKind]
		})

		return nodesOfKind
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
		// console.log()
		// console.log(sourceFile.fileName)

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

		function simplifyNode(node: ts.Node): ts.Node | undefined {
			const type = typeChecker.getTypeAtLocation(node)

			// const aliasTypeArguments = type.aliasTypeArguments || []

			// if (aliasTypeArguments.length === 0) {
			delete type.aliasSymbol
			delete type.aliasTypeArguments
			// }

			const oldTypeStr = node.getText(sourceFile) // getNodeText(ts.getOriginalNode(node))
			const newTypeStr = typeChecker.typeToString(type)
			const noChange = newTypeStr === oldTypeStr
			// console.log({ oldTypeStr, newTypeStr, noChange })
			if (noChange) return undefined

			if (ts.isTypeReferenceNode(node)) {
				const childType = typeChecker.getTypeAtLocation(node.typeName)
				const childTypeStr = typeChecker.typeToString(childType)
				if (childTypeStr === oldTypeStr) return undefined
			}

			try {
				const typeNode: ts.Node | undefined = typeChecker.typeToTypeNode(
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

		function getNodeText(node: ts.Node): string | undefined {
			try {
				return node.getText(sourceFile).replaceAll(/\s+/gu, ' ')
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
			let node = simplifyNode(originalNode)
			if (!node) return originalNode

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

		function canBeInlined(
			node: ts.Node,
			options?: { warn?: boolean | undefined },
		): boolean {
			// console.log('canBeInlined?', stringFromSyntaxKind(node.kind))

			// const symbols = collectSymbols(node)

			// for (const symbol of symbols) {
			// 	const declaration = symbol.declarations?.[0]
			// 	if (!declaration) return false // unresolved

			// 	if (declaration.kind === ts.SyntaxKind.TypeParameter) return false
			// }

			const newNode = simplifyNode(node)
			if (!newNode) return false

			if (hasNodeOfType(newNode, ts.SyntaxKind.MappedType)) {
				// console.warn('not inlining mapped types')
				return false
			}

			const symbolsOutOfScope = collectSymbolNames(newNode)

			// console.log(newSymbolNames)

			const symbolNames = collectSymbolNames(node)
			for (const symbolName of symbolNames) symbolsOutOfScope.delete(symbolName)

			// console.log('remaining symbols', newSymbolNames)

			for (const symbol of symbolsOutOfScope) {
				if (typeSymbols.has(symbol)) symbolsOutOfScope.delete(symbol)
			}

			const hasSymbolsOutOfScope = symbolsOutOfScope.size > 0

			if (hasSymbolsOutOfScope && options?.warn) {
				const message = `\n[@voltiso/transform] unable to inline ${
					getNodeText(node) || stringFromSyntaxKind(node.kind)
				} - symbols out of scope: ${[...symbolsOutOfScope].join(
					', ',
				)} \n  @ ${getNodePositionStr(node)}`

				// eslint-disable-next-line no-console
				console.warn(chalk.bgRed(message))

				if (pluginOptions.onInlineError === 'fail') throw new Error(message)
			}

			const importTypeNodes = collectNodesOfKind(
				newNode,
				ts.SyntaxKind.ImportType,
			)

			let containsImportAbsolutePath = false

			for (const importTypeNode of importTypeNodes) {
				const child = getFirstChildOrSelf(getFirstChildOrSelf(importTypeNode))
				if (ts.isStringLiteral(child) && child.text.startsWith('/')) {
					containsImportAbsolutePath = true

					if (options?.warn) {
						const message = `\n[@voltiso/transform] unable to inline ${
							getNodeText(node) || stringFromSyntaxKind(node.kind)
						} - resulting node text would include absolute disk path import of '${
							child.text
						}' \n  @ ${getNodePositionStr(node)}`

						// eslint-disable-next-line no-console
						console.warn(chalk.bgRed(message))

						if (pluginOptions.onInlineError === 'fail') throw new Error(message)
					}
				}
			}

			const canBeInlined = !hasSymbolsOutOfScope && !containsImportAbsolutePath

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

		function getFirstChildOrSelf(node: ts.Node): ts.Node {
			let firstChild: ts.Node | undefined
			node.forEachChild(child => {
				if (!firstChild) firstChild = child
			})
			if (!firstChild) return node
			// assert(firstChild, `getFirstChild: node has no children`)
			return firstChild
		}

		function visitor(originalNode: ts.Node): ts.Node {
			// console.log('visit', getNodeText(originalNode))

			let node = originalNode

			if (ts.isTypeNode(node) && hasNodeInlineComment(node)) {
				// const type = typeChecker.getTypeAtLocation(node)
				if (canBeInlined(node, { warn: true })) {
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
					? getFirstChildOrSelf(node.indexType)
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
