// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable sonarjs/no-nested-conditional */
/* eslint-disable sonarjs/nested-control-flow */
/* eslint-disable sonarjs/cyclomatic-complexity */
/* eslint-disable no-nested-ternary */
/* eslint-disable sonarjs/expression-complexity */
/* eslint-disable max-depth */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable n/no-sync */
/* eslint-disable security/detect-non-literal-fs-filename */

import * as fs from 'node:fs'
import * as path from 'node:path'

import type { TransformContext } from '@voltiso/transform.lib'
import * as ts from 'typescript'

import type { DeepPartial_ } from '~/_/index.js'
import { _deepMerge2 } from '~/_/index.js'

import type { CompatTransformOptions } from './_/index.js'
import {
	defaultCompatTransformOptions,
	logCompatTransformNode,
} from './_/index.js'

export interface CompatTransformContext extends TransformContext {
	options: CompatTransformOptions
}

function isDirectory(path: string) {
	try {
		return fs.statSync(path).isDirectory()
	} catch {}
	return false
}

function isFile(path: string) {
	try {
		return fs.statSync(path).isFile()
	} catch {}
	return false
}

function createDirnameDeclaration() {
	const factory = ts.factory

	return factory.createVariableStatement(
		undefined,
		factory.createVariableDeclarationList(
			[
				factory.createVariableDeclaration(
					factory.createIdentifier('__dirname'),
					undefined,
					undefined,
					factory.createCallExpression(
						factory.createPropertyAccessExpression(
							factory.createPropertyAccessExpression(
								factory.createNewExpression(
									factory.createIdentifier('URL'),
									undefined,
									[
										factory.createStringLiteral('.'),
										factory.createPropertyAccessExpression(
											factory.createMetaProperty(
												ts.SyntaxKind.ImportKeyword,
												factory.createIdentifier('meta'),
											),
											factory.createIdentifier('url'),
										),
									],
								),
								factory.createIdentifier('pathname'),
							),
							factory.createIdentifier('slice'),
						),
						undefined,
						[
							factory.createNumericLiteral('0'),
							factory.createPrefixUnaryExpression(
								ts.SyntaxKind.MinusToken,
								factory.createNumericLiteral('1'),
							),
						],
					),
				),
			],
			ts.NodeFlags.Const, //  | ts.NodeFlags.Constant,
		),
	)
}

export function compatTransform(
	program: ts.Program,
	partialOptions?: DeepPartial_<CompatTransformOptions>,
) {
	const moduleOption = program.getCompilerOptions().module
	const isImportMetaAvailable =
		moduleOption !== ts.ModuleKind.None &&
		moduleOption !== ts.ModuleKind.CommonJS &&
		moduleOption !== ts.ModuleKind.AMD &&
		moduleOption !== ts.ModuleKind.UMD

	const options: CompatTransformOptions = _deepMerge2(
		defaultCompatTransformOptions as never,
		partialOptions || {},
	) as never

	if (options.afterDeclarationsHack === undefined) {
		throw new Error('Please supply `afterDeclarationsHack` option')
	}

	const typeChecker = program.getTypeChecker()

	return (transformationContext: ts.TransformationContext) =>
		(sourceFile: ts.SourceFile): ts.SourceFile => {
			// console.log('compatTransform', sourceFile.fileName)

			const ctx: CompatTransformContext = {
				transformationContext,
				program,
				sourceFile,
				typeChecker,
				options,
			}

			let isDirnameDeclarationCreated = false
			let isDirnamePresent = false

			// eslint-disable-next-line sonarjs/function-return-type
			const visitor: ts.Visitor = node => {
				// console.log('visitor', ts.SyntaxKind[node.kind])

				if (ts.isIdentifier(node) && node.text === '__dirname') {
					isDirnamePresent = true
				}

				/** `numericSeparators` */
				if (!options.supported.numericSeparators && ts.isNumericLiteral(node)) {
					try {
						const nodeText = node.getText(sourceFile)
						if (nodeText?.includes('_')) {
							const newNodeStr = nodeText.replace(/_/gu, '')

							logCompatTransformNode(ctx, node, newNodeStr, {
								feature: 'numericSeparators',
							})

							return ts.factory.createNumericLiteral(newNodeStr)
							// return ts.factory.createNumericLiteral(node.text)
						}
					} catch {}
				}

				// console.log(options.afterDeclarationsHack, 'process', getNodeText(ctx, node))

				/** Import folders or files without extension */
				if (
					(!options.supported.importDirectory ||
						!options.supported.importWithoutExtension) &&
					node.parent &&
					ts.isStringLiteral(node) &&
					(ts.isImportDeclaration(node.parent) ||
						ts.isExportDeclaration(node.parent) ||
						(ts.isLiteralTypeNode(node.parent) &&
							ts.isImportTypeNode(node.parent.parent)))
				) {
					// console.log('yes')

					const isTypeOnly = ts.isLiteralTypeNode(node.parent)
						? false
						: ts.isImportDeclaration(node.parent)
							? node.parent.importClause?.isTypeOnly
							: node.parent.isTypeOnly

					if (!isTypeOnly || options.afterDeclarationsHack) {
						// const { moduleSpecifier } = node.parent

						const moduleSpecifier = node

						// if (moduleSpecifier) {
						let moduleSpecifierStr = moduleSpecifier.getText(sourceFile)

						const singleQuote = moduleSpecifierStr.startsWith(`'`)

						moduleSpecifierStr = moduleSpecifierStr.slice(1, -1)

						// console.log({ moduleSpecifierStr })

						// ! HACK !

						const paths = {
							'~': 'src',
							_: 'src/_',
						}

						for (const [key, value] of Object.entries(paths)) {
							if (moduleSpecifierStr.startsWith(key)) {
								const target = path.join(
									program.getCurrentDirectory(),
									value,
									moduleSpecifierStr.slice(1),
								)

								moduleSpecifierStr = path.relative(
									path.dirname(sourceFile.fileName),
									target,
								)

								// console.log({ moduleSpecifierStr })

								if (
									!moduleSpecifierStr.startsWith('./') &&
									!moduleSpecifierStr.startsWith('../')
								) {
									moduleSpecifierStr = `./${moduleSpecifierStr}`
								}
							}
						}

						// console.log('?', { moduleSpecifierStr })

						if (
							moduleSpecifierStr.startsWith('./') ||
							moduleSpecifierStr.startsWith('../')
							// 	&&
							// !moduleSpecifierStr.endsWith('.js')
							// &&
							// !moduleSpecifierStr.endsWith('.json')
						) {
							// console.log({ moduleSpecifierStr })
							// console.log('!!!', sourceFile.fileName)
							const myPath = path.join(
								path.dirname(sourceFile.fileName),
								moduleSpecifierStr,
							)

							// console.log({ myPath })

							if (isDirectory(myPath)) {
								if (!options.supported.importDirectory) {
									const newNodeStr = `${moduleSpecifierStr}/index.js`

									logCompatTransformNode(ctx, node, newNodeStr, {
										feature: 'importDirectory',
									})

									return ts.factory.createStringLiteral(newNodeStr, singleQuote)
								}
							} else if (
								!options.supported.importWithoutExtension &&
								!isFile(myPath)
							) {
								const mapExtensions = { ts: 'js', tsx: 'js', json: 'json' }

								for (const [ext, targetExt] of Object.entries(mapExtensions)) {
									const targetFile = `${myPath}.${ext}`
									if (!isFile(targetFile)) continue

									const newNodeStr = `${moduleSpecifierStr}.${targetExt}`

									// console.log('hack', options.afterDeclarationsHack)

									logCompatTransformNode(ctx, node, newNodeStr, {
										feature: 'importWithoutExtension',
									})

									return ts.factory.createStringLiteral(newNodeStr, singleQuote)
								}
							}
						}
						// }
					}
				}

				if (
					(ts.isExportSpecifier(node) || ts.isImportSpecifier(node)) &&
					node.isTypeOnly
				) {
					return undefined
				}

				/** `undefined` to `void 0` */
				if (
					!options.supported.undefined &&
					ts.isIdentifier(node) &&
					node.text === 'undefined'
				) {
					const symbol = typeChecker.getSymbolAtLocation(node)
					const declaration = symbol?.declarations?.[0]
					// console.log({ declaration })
					if (!declaration) {
						const newNode = ts.factory.createVoidZero()
						logCompatTransformNode(ctx, node, 'void 0', {
							feature: 'undefined',
						})
						return newNode
					}
				}

				const transformedNode = ts.visitEachChild(
					node,
					visitor,
					transformationContext,
				)

				if (
					isDirnamePresent &&
					isImportMetaAvailable &&
					!isDirnameDeclarationCreated &&
					node.parent === sourceFile
					// !ts.isNamedExports(transformedNode) &&
					// !ts.isExportDeclaration(transformedNode) &&
					// !ts.isImportDeclaration(transformedNode)
				) {
					// console.log('!!!', ts.SyntaxKind[transformedNode.kind], '->', node.parent)
					isDirnameDeclarationCreated = true
					// console.log(
					// 	'!!!',
					// 	transformedNode.getText(sourceFile),
					// 	sourceFile.fileName,
					// )
					return [createDirnameDeclaration(), transformedNode]
				} else return transformedNode
			}

			// const text = `dirname = new URL('.', import.meta.url).pathname.slice(0, -1)\n`
			// const newSourceFile = ts.updateSourceFile(
			// 	sourceFile,
			// 	text,
			// 	ts.createTextChangeRange(ts.createTextSpan(0, 0), text.length),
			// )

			const transformedSourceFile = ts.visitEachChild(
				sourceFile,
				visitor,
				transformationContext,
			)

			// const dirnameDeclaration = createDirnameDeclaration()

			// const statements = ts.factory.createNodeArray([
			// 	dirnameDeclaration,
			// 	...transformedSourceFile.statements,
			// ])

			// const newSourceFile = ts.factory.createSourceFile(
			// 	transformedSourceFile.statements,
			// 	ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
			// 	transformedSourceFile.flags,
			// )

			return transformedSourceFile
		}
}
