import type * as ts from 'typescript'

export function getFirstChildOrSelf(node: ts.Node): ts.Node {
	let firstChild: ts.Node | undefined
	node.forEachChild(child => {
		if (!firstChild) firstChild = child
	})
	if (!firstChild) return node
	// assert(firstChild, `getFirstChild: node has no children`)
	return firstChild
}
