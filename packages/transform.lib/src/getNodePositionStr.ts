// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as ts from 'typescript'

import { getGitRelativePath } from './git/index.js'

export function getNodePositionStr(
	node: ts.Node,
	sourceFile?: ts.SourceFile | undefined,
): string {
	// eslint-disable-next-line no-param-reassign
	node = ts.getOriginalNode(node)

	// eslint-disable-next-line no-param-reassign
	if (!sourceFile) sourceFile = node.getSourceFile()

	const lineCol = ts.getLineAndCharacterOfPosition(sourceFile, node.pos)

	const gitPath = getGitRelativePath(sourceFile.fileName)

	return `${gitPath ?? sourceFile.fileName}:${lineCol.line + 1}:${
		lineCol.character + 1
	}`
}
