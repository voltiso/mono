// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { strict as assert } from 'node:assert'

import * as ts from 'typescript'

export function buildNestedQualifiedName(symbolPath: string[]): ts.EntityName {
	assert(symbolPath.length > 0)

	if (symbolPath.length === 1)
		// biome-ignore lint/style/noNonNullAssertion: .
		return ts.factory.createIdentifier(symbolPath[0]!)

	return ts.factory.createQualifiedName(
		buildNestedQualifiedName(symbolPath.slice(0, -1)),
		// biome-ignore lint/style/noNonNullAssertion: .
		symbolPath.at(-1)!,
	)
}
