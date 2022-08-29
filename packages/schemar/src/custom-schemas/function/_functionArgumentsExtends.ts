// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema, ITuple, Schemable } from '@voltiso/schemar.types'
import { isTuple } from '@voltiso/schemar.types'

import { schema } from '~/custom-schemas/unknownSchema'

function _functionArgumentsExtends_(a: ITuple, b: ITuple): boolean {
	const aa = a.getShape
	const bb = b.getShape

	if (aa.length < bb.length) return false

	for (const [i, element] of bb.entries()) {
		// eslint-disable-next-line security/detect-object-injection
		const ok = schema(aa[i] as Schemable).extends(element)

		if (!ok) return false
	}

	return true
}

/** TODO: make it work with arrays with bounded lengths */
export function _functionArgumentsExtends(a: ISchema, b: ISchema): boolean {
	const aOk = isTuple(a)
	const bOk = isTuple(b)

	if (aOk && bOk) return _functionArgumentsExtends_(a, b)
	else return a.extends(b)
}
