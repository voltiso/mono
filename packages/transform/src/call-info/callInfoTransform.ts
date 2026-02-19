// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable sonarjs/no-nested-functions */

import type { TransformContext, TransformOptions } from '@voltiso/transform.lib'
import {
	_getPackageForFile,
	createLiteralExpression,
	defaultTransformOptions,
	getGitRelativePath,
} from '@voltiso/transform.lib'
import * as ts from 'typescript'

import { _deepMerge2 } from '~/_/copied-from-util/_deepMerge'
import { getJsDocTagNames } from '~/_/getJsDocTagNames'

import type { CallInfo } from './_'
import { getAstPath, logCallInfoNode } from './_/index.js'

// export interface StripTransformOptions
// 	extends Partial<{
// 		modules: string[]
// 		symbols: string[]
// 	}> {}

// export interface AssertorTransformContext extends TransformContext {
// 	pluginOptions: StripTransformOptions

// 	candidateNodeToStrip?: ts.Node | undefined
// 	shouldStripBecauseOfSymbol?: ts.Symbol | undefined
// }

export function callInfoTransform(program: ts.Program, pluginOptions?: object) {
	// printInitInfo(pluginOptions)

	const typeChecker = program.getTypeChecker()

	return (transformationContext: ts.TransformationContext) =>
		(sourceFile: ts.SourceFile): ts.SourceFile => {
			const options: TransformOptions = _deepMerge2(
				defaultTransformOptions as never,
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				(pluginOptions as never) ?? {},
			) as never
			const ctx: TransformContext = {
				program,
				options,
				transformationContext,
				sourceFile,
				typeChecker,
			}

			const visitor: ts.Visitor = node => {
				if (ts.isCallExpression(node)) {
					const symbol = typeChecker.getSymbolAtLocation(node.expression)

					// console.log('...............')

					const tags = symbol ? getJsDocTagNames(ctx, symbol) : []

					// console.log(
					// 	sourceFile.fileName,
					// 	'found symbol name',
					// 	symbol?.name,
					// 	tags,
					// )

					if (tags.includes('callInfo')) {
						logCallInfoNode(ctx, node)

						const lineAndCol = ts.getLineAndCharacterOfPosition(
							sourceFile,
							node.pos,
						)

						const filePath = node.getSourceFile().fileName

						const data: CallInfo = {
							expression: node.expression.getText(),

							arguments: node.arguments.map(arg => arg.getText()),

							typeArguments:
								node.typeArguments?.map(arg => arg.getText()) || [],

							location: {
								..._getPackageForFile(filePath),

								gitPath: getGitRelativePath(filePath),

								position: node.pos,
								line: lineAndCol.line,
								column: lineAndCol.character,

								astPath: getAstPath(node),
							},
						}

						return ts.factory.createCallExpression(
							node.expression,
							node.typeArguments,
							[
								...node.arguments,
								createLiteralExpression(data, {
									singleQuote: false,
									multiLine: true,
								}),
							],
						)
					}
					// let expression = node.expression

					// while (ts.isPropertyAccessExpression(expression))
					// 	expression = expression.expression

					// if (
					// 	ts.isIdentifier(expression) &&
					// 	['assert', '$assert'].includes(expression.text)
					// ) {
					// 	let declaration = typeChecker.getSymbolAtLocation(expression)
					// 		?.declarations?.[0] as ts.Node | undefined

					// 	if (declaration) {
					// 		while (
					// 			!ts.isImportDeclaration(declaration) &&
					// 			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
					// 			declaration.parent
					// 		) {
					// 			declaration = declaration.parent
					// 		}

					// 		if (
					// 			ts.isImportDeclaration(declaration) &&
					// 			ts.isStringLiteral(declaration.moduleSpecifier) &&
					// 			declaration.moduleSpecifier.text === '@voltiso/assertor' &&
					// 			node.arguments.length === 1
					// 		) {
					// 			const argument = node.arguments[0]
					// 			assert(argument)
					// 			return ts.factory.createCallExpression(
					// 				node.expression,
					// 				node.typeArguments,
					// 				[
					// 					...node.arguments,
					// 					ts.factory.createStringLiteral(argument.getText()),
					// 				],
					// 			)
					// 		}
					// 	}
					// }
				}

				return ts.visitEachChild(node, visitor, transformationContext)
			}

			return ts.visitEachChild(sourceFile, visitor, transformationContext)
		}
}
