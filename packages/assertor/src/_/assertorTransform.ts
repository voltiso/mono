// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as ts from 'typescript'

// eslint-disable-next-line import/no-default-export
export default function assertorTransform(
	_program: ts.Program,
	_pluginOptions: {},
) {
	return (ctx: ts.TransformationContext) => {
		return (sourceFile: ts.SourceFile) => {
			function visitor(node: ts.Node): ts.Node {
				/** Comment-out `$assert` calls */
				if (
					ts.isCallExpression(node) &&
					node.expression.getText() === '$assert'
				) {
					const notEmittedNode = ts.factory.createNotEmittedStatement(node)
					return ts.addSyntheticLeadingComment(
						notEmittedNode,
						ts.SyntaxKind.MultiLineCommentTrivia,
						node.getText(),
					)
				}

				/** Comment-out imports from `@voltiso/assertor` */
				if (
					ts.isImportDeclaration(node) &&
					ts.isStringLiteral(node.moduleSpecifier) &&
					node.moduleSpecifier.text.startsWith('@voltiso/assertor')
				) {
					const notEmittedNode = ts.factory.createNotEmittedStatement(node)
					return ts.addSyntheticLeadingComment(
						notEmittedNode,
						ts.SyntaxKind.MultiLineCommentTrivia,
						node.getText(),
					)
				}

				return ts.visitEachChild(node, visitor, ctx)
			}
			return ts.visitEachChild(sourceFile, visitor, ctx)
		}
	}
}
