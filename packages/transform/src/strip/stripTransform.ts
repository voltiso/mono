// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransformContext } from '@voltiso/transform.lib'
import * as ts from 'typescript'

import { logStrippedNode, moduleIcon } from './_'
import { shouldStripModule } from './_/shouldStripModule'
import { shouldStripSymbol } from './_/shouldStripSymbol'

export interface StripTransformOptions
	extends Partial<{
		modules: string[]
		symbols: string[]
	}> {}

export interface StripTransformContext extends TransformContext {
	options: StripTransformOptions

	candidateNodeToStrip?: ts.Node | undefined
	shouldStripBecauseOfSymbol?: ts.Symbol | undefined
}

export function stripTransform(
	program: ts.Program,
	pluginOptions: StripTransformOptions,
) {
	// printInitInfo(pluginOptions)

	const typeChecker = program.getTypeChecker()

	return (transformationContext: ts.TransformationContext) =>
		(sourceFile: ts.SourceFile) => {
			// console.log('compile', sourceFile.fileName)

			// eslint-disable-next-line n/no-process-env
			const isEnabled = !process.env['VOLTISO_STRIP_DISABLE']

			const ctx: StripTransformContext = {
				program,
				options: pluginOptions,
				transformationContext,
				sourceFile,
				typeChecker,
			}

			const visitor: ts.Visitor = node => {
				if (!isEnabled || ctx.shouldStripBecauseOfSymbol) return node

				/** Comment-out tokens including the whole instruction */
				if (ts.isIdentifier(node)) {
					const symbol = typeChecker.getSymbolAtLocation(node)
					if (
						symbol &&
						shouldStripSymbol(ctx, symbol) &&
						ctx.candidateNodeToStrip
					) {
						// console.log('will strip because of', symbol.name)
						ctx.shouldStripBecauseOfSymbol = symbol
						return node
					}
				}

				/** Comment-out import declarations */
				if (
					ts.isImportDeclaration(node) &&
					ts.isStringLiteral(node.moduleSpecifier) &&
					shouldStripModule(ctx, node.moduleSpecifier.text)
				) {
					logStrippedNode(node)

					const notEmittedNode = ts.factory.createNotEmittedStatement(node)

					const commentedOut = ts.addSyntheticLeadingComment(
						notEmittedNode,
						ts.SyntaxKind.MultiLineCommentTrivia,
						node.getText(),
					)

					return commentedOut
				}

				if (
					ctx.candidateNodeToStrip ||
					(!ts.isExpressionStatement(node) && !ts.isVariableStatement(node))
					// && !ts.isImportSpecifier(node)
				)
					return ts.visitEachChild(node, visitor, transformationContext)

				let result: ts.Node
				try {
					ctx.candidateNodeToStrip = node
					// console.log(sourceFile.fileName, 'candidate node to strip', ctx.candidateNodeToStrip.getText())
					result = ts.visitEachChild(node, visitor, transformationContext)
				} finally {
					delete ctx.candidateNodeToStrip
				}

				// for variable statements: do not strip if the symbol to strip is actually defined here
				if (
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					ctx.shouldStripBecauseOfSymbol &&
					ts.isVariableStatement(node) &&
					node.declarationList.declarations
						.map(node => node.name.getText())
						.includes((ctx.shouldStripBecauseOfSymbol as ts.Symbol).name)
				) {
					// console.log(sourceFile.fileName, 'cancel', node.getText())
					ctx.shouldStripBecauseOfSymbol = undefined
				}

				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (ctx.shouldStripBecauseOfSymbol) {
					logStrippedNode(node)

					// if (ts.isImportSpecifier(node)) return []

					let result = ts.factory.createNotEmittedStatement(node)

					result = ts.addSyntheticLeadingComment(
						result,
						ts.SyntaxKind.SingleLineCommentTrivia,
						` ${moduleIcon} [@voltiso/transform/strip] Commented-out because of symbol \`${
							(ctx.shouldStripBecauseOfSymbol as ts.Symbol).name
						}\``,
					)

					result = ts.addSyntheticLeadingComment(
						result,
						ts.SyntaxKind.MultiLineCommentTrivia,
						node.getText(),
					)

					ctx.shouldStripBecauseOfSymbol = undefined
					return result
				}

				return result
			}

			return ts.visitEachChild(sourceFile, visitor, transformationContext)
		}
}
