// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as ts from 'typescript'

export function getNodePositionStr(node: ts.Node) {
	// eslint-disable-next-line no-param-reassign
	node = ts.getOriginalNode(node)
	const sourceFile = node.getSourceFile()
	const lineCol = ts.getLineAndCharacterOfPosition(sourceFile, node.pos)
	return `${sourceFile.fileName}:${lineCol.line + 1}:${lineCol.character + 1}`
}
