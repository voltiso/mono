// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema, ITuple, Schemable } from '~'
import { isTupleSchema } from '~'
import { schema } from '~/core-schemas'

function _functionArgumentsExtends_(a: ITuple, b: ITuple): boolean {
	const aa = a.getShape
	const bb = b.getShape

	if (aa.length < bb.length) return false

	for (const [i, element] of bb.entries()) {
		const ok = schema(aa[i] as Schemable).extends(element)

		if (!ok) return false
	}

	return true
}

/** TODO: make it work with arrays with bounded lengths */
export function _functionArgumentsExtends(a: ISchema, b: ISchema): boolean {
	const aOk = isTupleSchema(a)
	const bOk = isTupleSchema(b)

	if (aOk && bOk) return _functionArgumentsExtends_(a, b)
	else return a.extends(b)
}
