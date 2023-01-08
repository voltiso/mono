// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as ts from 'typescript'

function isWithName(node: ts.Node): node is ts.Node & {
	name: unknown
} {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	return !!(node as any)?.name
}

export function getAstPath(node: ts.Node): string[] {
	// console.log(`getAstPath(${node.getText()})`)
	const path: string[] = []

	let current: ts.Node | undefined = node

	while (current) {
		if (isWithName(current)) {
			const name = current.name as
				| ts.Identifier
				| ts.PropertyName
				| ts.BindingName

			path.push(name.getText())
		}

		current = current.parent as ts.Node | undefined
	}

	path.reverse()
	return path
}
