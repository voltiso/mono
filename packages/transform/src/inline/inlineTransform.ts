// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-nested-ternary */

import type { TransformContext } from '@voltiso/transform.lib'
import * as ts from 'typescript'

import { getJsDocTagNames } from '~/_'

import {
	canBeInlined,
	getFirstChildOrSelf,
	hasNodeInlineComment,
	logInlinedNode,
	simplifyAndAddComment,
} from './_/index.js'

export interface InlineTransformOptions {
	onInlineError?: 'fail' | undefined
}

export interface InlineTransformContext extends TransformContext {
	options: InlineTransformOptions
}

export function inlineTransform(
	program: ts.Program,
	pluginOptions?: InlineTransformOptions,
) {
	const typeChecker = program.getTypeChecker()

	return (transformationContext: ts.TransformationContext) =>
		(sourceFile: ts.SourceFile) => {
			const ctx: InlineTransformContext = {
				transformationContext,
				program,
				sourceFile,
				typeChecker,
				options: pluginOptions || {},
			}

			function visitor(originalNode: ts.Node): ts.Node {
				// console.log('visit', getNodeText(originalNode))

				let node = originalNode

				if (ts.isTypeNode(node) && hasNodeInlineComment(ctx, node)) {
					// const type = typeChecker.getTypeAtLocation(node)
					if (canBeInlined(ctx, node, { warn: true })) {
						logInlinedNode(ctx, originalNode, { type: 'expression' })
						node = simplifyAndAddComment(ctx, node)
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

					const symbol = typeChecker.getSymbolAtLocation(symbolNode)

					if (symbol) {
						// console.log('...\n\n')
						const tags = getJsDocTagNames(ctx, symbol)
						const hasInlineTag = tags.includes('inline')

						// console.log('hasInlineTag?', symbol, hasInlineTag, '\n\n\n')

						if (hasInlineTag && canBeInlined(ctx, node)) {
							logInlinedNode(ctx, originalNode, { type: 'alias' })
							// // eslint-disable-next-line no-console
							// console.log(
							// 	'\n',
							// 	'[@voltiso/transform] inlining type alias:',
							// 	getNodeText(ctx, originalNode) ||
							// 		stringFromSyntaxKind(node.kind),
							// 	'\n  @',
							// 	getNodePositionStr(originalNode),
							// )
							node = simplifyAndAddComment(ctx, node)
						}
					}
				}

				return ts.visitEachChild(node, visitor, transformationContext)
			}

			return ts.visitEachChild(sourceFile, visitor, transformationContext)
		}
}
