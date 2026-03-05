// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransformContext, TransformOptions } from '@voltiso/transform.lib'
import { defaultTransformOptions } from '@voltiso/transform.lib'
import * as ts from 'typescript'

import { _deepMerge2 } from '~/_/copied-from-util/_deepMerge'
import { getJsDocTagNames } from '~/_/getJsDocTagNames'

import {
	canBeInlined,
	getFirstChildOrSelf,
	hasNodeInlineComment,
	logInlinedNode,
	simplifyAndAddComment,
} from './_/index.js'

export interface InlineTransformOptions extends TransformOptions {
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
		(sourceFile: ts.SourceFile): ts.SourceFile => {
			const options: InlineTransformOptions = _deepMerge2(
				defaultTransformOptions as never,

				(pluginOptions as never) ?? {},
			) as never

			const ctx: InlineTransformContext = {
				transformationContext,
				program,
				sourceFile,
				typeChecker,
				options,
			}

			// console.log('FILE', sourceFile.fileName)

			function visitor(originalNode: ts.Node): ts.Node {
				// console.log('visit', getNodeText(ctx, originalNode))

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
					// console.log('--------- BRANCH B')
					const symbolNode = ts.isTypeReferenceNode(node)
						? node.typeName
						: ts.isIndexedAccessTypeNode(node)
							? getFirstChildOrSelf(node.indexType)
							: ts.isTypeQueryNode(node)
								? node.exprName
								: node

					// console.log('symbolNode', symbolNode)

					const symbol = typeChecker.getSymbolAtLocation(symbolNode)

					// console.log('symbol', symbol)

					if (symbol) {
						// console.log('...\n\n')
						const tags = getJsDocTagNames(ctx, symbol)
						const hasInlineTag = tags.includes('inline')

						// console.log('============ TAGS ==', tags)

						// console.log('hasInlineTag?', symbol, hasInlineTag, '\n\n\n')

						// console.log('canBeInlined?', canBeInlined(ctx, node))

						if (hasInlineTag && canBeInlined(ctx, node)) {
							logInlinedNode(ctx, originalNode, { type: 'alias' })
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
