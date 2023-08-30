// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TransformContext } from '@voltiso/transform.lib'
import * as ts from 'typescript'

import type { DeepPartial_ } from '~/_'
import { _deepMerge2 } from '~/_'

import type { CompatTransformOptions } from './_'
import { defaultCompatTransformOptions, logCompatTransformNode } from './_'

export interface CompatTransformContext extends TransformContext {
	options: CompatTransformOptions
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

	const typeChecker = program.getTypeChecker()

	return (transformationContext: ts.TransformationContext) =>
		(sourceFile: ts.SourceFile) => {
			const ctx: CompatTransformContext = {
				transformationContext,
				program,
				sourceFile,
				typeChecker,
				options,
			}

			const visitor: ts.Visitor = node => {
				/** `numericSeparators` */
				if (
					!options.supported.numericSeparators &&
					ts.isNumericLiteral(node)
				) {
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
