// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable sonarjs/nested-control-flow */

import type { TransformContext } from '@voltiso/transform.lib'
import * as ts from 'typescript'

function poorMansGetJsDocTags(node: ts.Node) {
	// console.log('poorMansGetJsDocTags', node.getFullText())
	const source = node.getSourceFile().getFullText()

	const commentRanges = ts.getLeadingCommentRanges(source, node.pos)

	const tags: string[] = []

	for (const commentRange of commentRanges || []) {
		const comment = source.slice(commentRange.pos, commentRange.end)

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const moreTags = [...comment.matchAll(/@(\S+)/gu)].map(match => match[1]!)
		// console.log('xxxxxxxxx', comment, tags)
		tags.push(...moreTags)
	}

	return tags
}

export function getJsDocTagNames(
	ctx: TransformContext,
	symbol: ts.Symbol,
): string[] {
	// console.log(
	// 	'getJsDocTagNames',
	// 	symbol.name,
	// 	symbol.flags,
	// 	'at',
	// 	symbol.declarations?.[0]?.getSourceFile().fileName,
	// )

	const tags = symbol.getJsDocTags(ctx.typeChecker).map(tag => tag.name)

	// // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	// const linkedSymbol = (symbol as any).links?.target as ts.Symbol | undefined
	// if (linkedSymbol) {
	// 	const moreTags = getJsDocTagNames(ctx, linkedSymbol)
	// 	tags.push(...moreTags)
	// }

	if (symbol.declarations?.[0])
		tags.push(...poorMansGetJsDocTags(symbol.declarations[0]))

	if (
		symbol.valueDeclaration &&
		symbol.valueDeclaration !== symbol.declarations?.[0]
	) {
		tags.push(...poorMansGetJsDocTags(symbol.valueDeclaration))
	}

	// // eslint-disable-next-line no-bitwise
	// if (symbol.flags & ts.SymbolFlags.TypeAlias) {
	// 	// console.log('found type alias!', symbol, symbol.declarations?.[0]?.kind)
	// 	const typeAliasDeclaration = symbol.declarations?.[0]
	// 	if (typeAliasDeclaration?.kind === ts.SyntaxKind.TypeAliasDeclaration) {
	// 		// console.log(
	// 		// 	'found type alias declaration!',
	// 		// 	typeAliasDeclaration.getText(),
	// 		// )
	// 		const moreTags = poorMansGetJsDocTags(typeAliasDeclaration)
	// 		tags.push(...moreTags)
	// 	}
	// }

	// // eslint-disable-next-line no-bitwise
	// if (symbol.flags & ts.SymbolFlags.Method) {
	// 	const methodDeclaration = symbol.valueDeclaration
	// 	if (methodDeclaration?.kind === ts.SyntaxKind.MethodDeclaration) {
	// 		// console.log('found method declaration!', methodDeclaration.getFullText())

	// 		const moreTags = poorMansGetJsDocTags(methodDeclaration)
	// 		// console.log('moreTags', moreTags)
	// 		tags.push(...moreTags)
	// 	}
	// }

	// // eslint-disable-next-line no-bitwise
	// if (symbol.flags & ts.SymbolFlags.Function) {
	// 	const functionDeclaration = symbol.valueDeclaration
	// 	if (functionDeclaration?.kind === ts.SyntaxKind.FunctionDeclaration) {
	// 		const moreTags = poorMansGetJsDocTags(functionDeclaration)
	// 		tags.push(...moreTags)
	// 	}
	// }

	// eslint-disable-next-line no-bitwise
	if (symbol.flags & ts.SymbolFlags.BlockScopedVariable) {
		// console.log('AA')
		const variableDeclaration = symbol.valueDeclaration
		if (variableDeclaration?.kind === ts.SyntaxKind.VariableDeclaration) {
			// console.log('BB')
			const variableDeclarationList = variableDeclaration.parent
			if (
				variableDeclarationList.kind === ts.SyntaxKind.VariableDeclarationList
			) {
				// console.log('DD')
				const variableStatement = variableDeclarationList.parent
				if (variableStatement.kind === ts.SyntaxKind.VariableStatement) {
					// console.log('XX', variableStatement.getFullText())

					const moreTags = poorMansGetJsDocTags(variableStatement)
					tags.push(...moreTags)

					// const variableStatementInternal = variableStatement as {jsDoc?: ts.JSDoc[]}
					// // does not work... ?!
					// for(const jsDoc of variableStatementInternal.jsDoc || []) {
					// 	const moreTags = jsDoc.tags?.map(tag => tag.tagName.getText()) || []
					// 	console.log('moreTags', moreTags)
					// 	tags.push(...moreTags)
					// }
				}
			}
		}
	}

	// eslint-disable-next-line no-bitwise
	if (symbol.flags & ts.SymbolFlags.Alias) {
		// console.log('follow alias...', symbol.name)
		const targetSymbol = ctx.typeChecker.getImmediateAliasedSymbol(symbol)
		if (targetSymbol) {
			const moreTags = getJsDocTagNames(ctx, targetSymbol)
			tags.push(...moreTags)
		}
	}

	return tags
}
