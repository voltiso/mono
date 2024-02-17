// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransformContext } from '@voltiso/transform.lib'
import * as ts from 'typescript'

import type { DeepPartial_ } from '~/_'
import { _deepMerge2 } from '~/_'

import type { CompatTransformOptions } from './_'
import { defaultCompatTransformOptions, logCompatTransformNode } from './_'
import * as path from 'node:path'
import * as fs from 'node:fs'

export interface CompatTransformContext extends TransformContext {
	options: CompatTransformOptions
}

function isDirectory(path: string) {
	try {
		return fs.statSync(path).isDirectory()
	} catch {}
	return false
}

export function compatTransform(
	program: ts.Program,
	partialOptions?: DeepPartial_<CompatTransformOptions> | undefined,
) {
	// eslint-disable-next-line etc/no-internal
	const options: CompatTransformOptions = _deepMerge2(
		defaultCompatTransformOptions,
		partialOptions || {},
	) as never

	if (options.afterDeclarationsHack === undefined) {
		throw new Error('Please supply `stripTypeOnly` option')
	}

	const typeChecker = program.getTypeChecker()

	return (transformationContext: ts.TransformationContext) =>
		(sourceFile: ts.SourceFile) => {
			// console.log('DECL', program.getCompilerOptions())

			const ctx: CompatTransformContext = {
				transformationContext,
				program,
				sourceFile,
				typeChecker,
				options,
			}

			const visitor: ts.Visitor = node => {
				/** `numericSeparators` */
				if (!options.supported.numericSeparators && ts.isNumericLiteral(node)) {
					try {
						const nodeText = node.getText(sourceFile)
						if (nodeText && nodeText.includes('_')) {
							const newNodeStr = nodeText.replace(/_/gu, '')

							logCompatTransformNode(ctx, node, newNodeStr, {
								feature: 'numericSeparators',
							})

							return ts.factory.createNumericLiteral(newNodeStr)
							// return ts.factory.createNumericLiteral(node.text)
						}
					} catch {}
				}

				/** Import folders or files without extension */
				if (
					!options.supported.importDirectory ||
					!options.supported.importWithoutExtension
				) {
					if (
						node.parent &&
						ts.isStringLiteral(node) &&
						(ts.isImportDeclaration(node.parent) ||
							ts.isExportDeclaration(node.parent))
					) {
						const isTypeOnly = ts.isImportDeclaration(node.parent)
							? node.parent.importClause?.isTypeOnly
							: node.parent.isTypeOnly

						if (!isTypeOnly || options.afterDeclarationsHack) {
							const moduleSpecifier = node.parent.moduleSpecifier

							if (moduleSpecifier) {
								let moduleSpecifierStr = moduleSpecifier.getText(sourceFile)

								const singleQuote = moduleSpecifierStr.startsWith("'")

								moduleSpecifierStr = moduleSpecifierStr.slice(1, -1)

								// console.log({ moduleSpecifierStr })

								// ! HACK !

								const paths = {
									'~': 'src',
									'_': 'src/_',
								}

								for(const [key, value] of Object.entries(paths)) {
									if (moduleSpecifierStr.startsWith(key)) {
										const target = path.join(
											program.getCurrentDirectory(),
											value,
											moduleSpecifierStr.slice(1),
										)

										moduleSpecifierStr =
											path.relative(path.dirname(sourceFile.fileName), target)

										console.log({moduleSpecifierStr})

										if(!moduleSpecifierStr.startsWith('./') && !moduleSpecifierStr.startsWith('../')) {
											moduleSpecifierStr = `./${moduleSpecifierStr}`
										}
									}
								}

								// console.log('?', { moduleSpecifierStr })

								if (
									(moduleSpecifierStr.startsWith('./') ||
										moduleSpecifierStr.startsWith('../')) &&
									!moduleSpecifierStr.endsWith('.js')
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
											const newNodeStr = moduleSpecifierStr + '/index.js'

											logCompatTransformNode(ctx, node, newNodeStr, {
												feature: 'importDirectory',
											})

											return ts.factory.createStringLiteral(
												newNodeStr,
												singleQuote,
											)
										}
									} else {
										if (!options.supported.importWithoutExtension) {
											const newNodeStr = moduleSpecifierStr + '.js'

											logCompatTransformNode(ctx, node, newNodeStr, {
												feature: 'importWithoutExtension',
											})

											return ts.factory.createStringLiteral(
												newNodeStr,
												singleQuote,
											)
										}
									}
								}
							}
						}
					}
				}

				if (ts.isExportSpecifier(node) || ts.isImportSpecifier(node)) {
					if (node.isTypeOnly) {
						return undefined
					}
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

				return ts.visitEachChild(node, visitor, transformationContext)
			}

			return ts.visitEachChild(sourceFile, visitor, transformationContext)
		}
}
