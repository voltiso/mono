// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as ts from 'typescript'

export interface TransformContext {
	transformationContext: ts.TransformationContext
	sourceFile: ts.SourceFile
	program: ts.Program
	typeChecker: ts.TypeChecker

	options: object
}
