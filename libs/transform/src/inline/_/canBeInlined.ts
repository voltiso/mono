// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getNodePositionStr, getNodeText } from '@voltiso/transform.lib'
import * as pc from 'picocolors'
import * as ts from 'typescript'

import type { InlineTransformContext } from '../inlineTransform.js'
import { collectNodesOfKind } from './collectNodesOfKind.js'
import { collectSymbolNames } from './collectSymbolNames.js'
import { collectValueSymbolNames } from './collectValueSymbolNames.js'
import { getFirstChildOrSelf } from './getFirstChildOrSelf.js'
import { hasNodeOfType } from './hasNodeOfType.js'
import { simplifyNode } from './simplifyNode.js'

export function canBeInlined(
	ctx: InlineTransformContext,
	node: ts.Node,
	options?: { warn?: boolean | undefined },
): boolean {
	const typeSymbols = new Set(
		ctx.typeChecker
			.getSymbolsInScope(
				ctx.sourceFile,

				ts.SymbolFlags.Type |
					ts.SymbolFlags.Class |
					ts.SymbolFlags.Interface |
					ts.SymbolFlags.ModuleMember,
			)
			.map(symbol => symbol.name),
	)

	const valueSymbols = new Set(
		ctx.typeChecker
			.getSymbolsInScope(
				ctx.sourceFile,

				ts.SymbolFlags.Variable |
					ts.SymbolFlags.Function |
					ts.SymbolFlags.Method |
					ts.SymbolFlags.Class |
					ts.SymbolFlags.Value,
			)
			.map(symbol => symbol.name),
	)

	const aliasSymbols = new Map<string, ts.Symbol>(
		ctx.typeChecker
			.getSymbolsInScope(ctx.sourceFile, ts.SymbolFlags.Alias)
			.map(symbol => [symbol.name, symbol]),
	)

	// console.log('symbols in scope', typeSymbols)

	const newNode = simplifyNode(ctx, node)
	if (!newNode) return false

	// console.log('simplified node', getNodeText(ctx, node), '=>', newNode)

	if (hasNodeOfType(newNode, ts.SyntaxKind.MappedType)) {
		// console.warn('not inlining mapped types')
		return false
	}

	if (ts.isTypeReferenceNode(node)) {
		const typeParameterSymbols = new Set(
			ctx.typeChecker
				.getSymbolsInScope(node, ts.SymbolFlags.TypeParameter)
				.map(symbol => symbol.name),
		)

		for (const arg of node.typeArguments || []) {
			const symbol = ctx.typeChecker.getSymbolAtLocation(
				getFirstChildOrSelf(arg),
			)

			if (symbol && typeParameterSymbols.has(symbol.name)) {
				// console.warn(
				// 	'not inlining type reference that uses type argument declared as outer type parameter',
				// 	node.getText(),
				// )
				return false
			}
		}
	}

	let hasTypeSymbolsOutOfScope: boolean
	{
		const symbolsOutOfScope = collectSymbolNames(newNode)
		// console.log('collected symbol names', symbolsOutOfScope)

		// console.log(newSymbolNames)

		const symbolNames = collectSymbolNames(node)
		for (const symbolName of symbolNames) symbolsOutOfScope.delete(symbolName)

		// console.log('remaining symbols', newSymbolNames)

		for (const symbol of symbolsOutOfScope) {
			if (typeSymbols.has(symbol)) symbolsOutOfScope.delete(symbol)
		}

		hasTypeSymbolsOutOfScope = symbolsOutOfScope.size > 0

		if (hasTypeSymbolsOutOfScope && options?.warn) {
			const message = `\n[@voltiso/transform] unable to inline ${
				getNodeText(ctx, node) ?? ts.SyntaxKind[node.kind]
			} - type symbols out of scope: ${[...symbolsOutOfScope].join(
				', ',
			)} \n  @ ${getNodePositionStr(node)}`

			console.warn(pc.bgRed(message))

			if (ctx.options.onInlineError === 'fail') throw new Error(message)
		}
	}

	//

	let hasValueSymbolsOutOfScope: boolean
	{
		const symbolsOutOfScope = collectValueSymbolNames(newNode)
		// console.log('collected value symbol names', symbolsOutOfScope)

		const symbolNames = collectValueSymbolNames(node)
		for (const symbolName of symbolNames) symbolsOutOfScope.delete(symbolName)

		for (const symbol of symbolsOutOfScope) {
			if (valueSymbols.has(symbol)) symbolsOutOfScope.delete(symbol)
		}

		for (const symbol of symbolsOutOfScope) {
			if (aliasSymbols.has(symbol)) {
				// biome-ignore lint/style/noNonNullAssertion: .
				const aliasSymbol = aliasSymbols.get(symbol)!
				const aliasedSymbol = ctx.typeChecker.getAliasedSymbol(aliasSymbol)

				if (aliasedSymbol.flags & ts.SymbolFlags.Value) {
					symbolsOutOfScope.delete(symbol)
				}
			}
		}

		hasValueSymbolsOutOfScope = symbolsOutOfScope.size > 0

		if (hasValueSymbolsOutOfScope && options?.warn) {
			const message = `\n[@voltiso/transform] unable to inline ${
				getNodeText(ctx, node) ?? ts.SyntaxKind[node.kind]
			} - value symbols out of scope: ${[...symbolsOutOfScope].join(
				', ',
			)} \n  @ ${getNodePositionStr(node)}`

			console.warn(pc.bgRed(message))

			if (ctx.options.onInlineError === 'fail') throw new Error(message)
		}
	}

	//

	const importTypeNodes = collectNodesOfKind(newNode, ts.SyntaxKind.ImportType)

	let containsImportAbsolutePath = false

	for (const importTypeNode of importTypeNodes) {
		const child = getFirstChildOrSelf(getFirstChildOrSelf(importTypeNode))
		if (ts.isStringLiteral(child) && child.text.startsWith('/')) {
			containsImportAbsolutePath = true

			if (options?.warn) {
				const message = `\n[@voltiso/transform] unable to inline ${
					getNodeText(ctx, node) ?? ts.SyntaxKind[node.kind]
				} - resulting node text would include absolute disk path import of '${
					child.text
				}' \n  @ ${getNodePositionStr(node)}`

				console.warn(pc.bgRed(message))

				if (ctx.options.onInlineError === 'fail') throw new Error(message)
			}
		}
	}

	//

	// const typeQueryNodes = collectNodesOfKind(newNode, ts.SyntaxKind.TypeQuery)

	// const containsTypeQueryNodes = typeQueryNodes.length > 0

	// if (options?.warn && containsTypeQueryNodes) {
	// 	const message = `\n[@voltiso/transform] unable to inline ${
	// 		getNodeText(ctx, node) ?? ts.SyntaxKind[node.kind]
	// 	} - resulting node text would include type query node (typeof) \n  @ ${getNodePositionStr(
	// 		node,
	// 	)}`

	// 	console.warn(pc.bgRed(message))

	// 	// !!! do not fail on type query nodes - ok?
	// 	// if (ctx.options.onInlineError === 'fail') throw new Error(message)
	// 	// !!!
	// }

	// console.log({
	// 	hasSymbolsOutOfScope,
	// 	containsImportAbsolutePath,
	// 	containsTypeQueryNodes,
	// 	warn: options?.warn,
	// })

	const canBeInlined =
		!hasTypeSymbolsOutOfScope &&
		!hasValueSymbolsOutOfScope &&
		!containsImportAbsolutePath // &&
	// !containsTypeQueryNodes

	return canBeInlined
}
