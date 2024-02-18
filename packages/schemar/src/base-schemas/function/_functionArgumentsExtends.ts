// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { schema } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import type { Schema } from '~/types/Schema/ISchema'
import type { Schemable } from '~/types/Schemable/Schemable'

import { isTupleSchema } from '../tuple/isTuple'
import type { ITuple } from '../tuple/ITuple'

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
export function _functionArgumentsExtends(a: Schema, b: Schema): boolean {
	const aOk = isTupleSchema(a)
	const bOk = isTupleSchema(b)

	if (aOk && bOk) return _functionArgumentsExtends_(a, b)
	else return a.extends(b)
}
