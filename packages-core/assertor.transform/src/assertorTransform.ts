// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as ts from 'typescript'

// eslint-disable-next-line n/no-process-env
const isEnabled = !process.env['ASSERTOR_NO_STRIP']

if (isEnabled) {
	// eslint-disable-next-line no-console
	console.log('[@voltiso/assertor.transform] stripping $assert calls')
} else {
	// eslint-disable-next-line no-console
	console.warn(
		'[@voltiso/assertor.transform] ASSERTS WILL NOT BE STRIPPED! (ASSERTOR_NO_STRIP env variable is set)',
	)
}

export function assertorTransform(_program: ts.Program, _pluginOptions: {}) {
	return (ctx: ts.TransformationContext) => (sourceFile: ts.SourceFile) => {
		function visitor(node: ts.Node): ts.Node {
			if (!isEnabled) return node

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
