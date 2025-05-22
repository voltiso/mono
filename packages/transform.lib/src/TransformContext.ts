// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as ts from 'typescript'

export interface TransformOptions {
	/**
	 * If `true`, do not print any logs.
	 *
	 * @defaultValue `false`
	 */
	silent: boolean
}

export const defaultTransformOptions: TransformOptions = {
	silent: false,
}

export interface TransformContext {
	transformationContext: ts.TransformationContext
	sourceFile: ts.SourceFile
	program: ts.Program
	typeChecker: ts.TypeChecker

	options: TransformOptions
}
