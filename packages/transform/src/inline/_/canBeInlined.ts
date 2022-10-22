// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { stringFromSyntaxKind } from '@voltiso/transform.lib'
import chalk from 'chalk'
import * as ts from 'typescript'

import { getNodePositionStr, getNodeText } from '~/_'

import type { InlineTransformContext } from '../inlineTransform'
import { collectNodesOfKind } from './collectNodesOfKind'
import { collectSymbolNames } from './collectSymbolNames'
import { getFirstChildOrSelf } from './getFirstChildOrSelf'
import { hasNodeOfType } from './hasNodeOfType'
import { simplifyNode } from './simplifyNode'

export function canBeInlined(
	ctx: InlineTransformContext,
	node: ts.Node,
	options?: { warn?: boolean | undefined },
): boolean {
	const typeSymbols = new Set(
		ctx.typeChecker
			.getSymbolsInScope(
				ctx.sourceFile,
				// eslint-disable-next-line no-bitwise
				ts.SymbolFlags.Type |
					ts.SymbolFlags.Class |
					ts.SymbolFlags.Interface |
					ts.SymbolFlags.ModuleMember,
			)
			.map(symbol => symbol.name),
	)

	const newNode = simplifyNode(ctx, node)
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
			getNodeText(ctx, node) || stringFromSyntaxKind(node.kind)
		} - symbols out of scope: ${[...symbolsOutOfScope].join(
			', ',
		)} \n  @ ${getNodePositionStr(node)}`

		// eslint-disable-next-line no-console
		console.warn(chalk.bgRed(message))

		if (ctx.pluginOptions.onInlineError === 'fail') throw new Error(message)
	}

	const importTypeNodes = collectNodesOfKind(newNode, ts.SyntaxKind.ImportType)

	let containsImportAbsolutePath = false

	for (const importTypeNode of importTypeNodes) {
		const child = getFirstChildOrSelf(getFirstChildOrSelf(importTypeNode))
		if (ts.isStringLiteral(child) && child.text.startsWith('/')) {
			containsImportAbsolutePath = true

			if (options?.warn) {
				const message = `\n[@voltiso/transform] unable to inline ${
					getNodeText(ctx, node) || stringFromSyntaxKind(node.kind)
				} - resulting node text would include absolute disk path import of '${
					child.text
				}' \n  @ ${getNodePositionStr(node)}`

				// eslint-disable-next-line no-console
				console.warn(chalk.bgRed(message))

				if (ctx.pluginOptions.onInlineError === 'fail') throw new Error(message)
			}
		}
	}

	const canBeInlined = !hasSymbolsOutOfScope && !containsImportAbsolutePath

	return canBeInlined
}
