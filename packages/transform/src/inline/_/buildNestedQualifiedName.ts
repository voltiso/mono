// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { strict as assert } from 'node:assert'

import * as ts from 'typescript'

export function buildNestedQualifiedName(symbolPath: string[]): ts.EntityName {
	assert(symbolPath.length > 0)

	if (symbolPath.length === 1)
		return ts.factory.createIdentifier(symbolPath[0]!)

	return ts.factory.createQualifiedName(
		buildNestedQualifiedName(symbolPath.slice(0, -1)),
		// eslint-disable-next-line es-x/no-array-prototype-at
		symbolPath.at(-1)!,
	)
}
