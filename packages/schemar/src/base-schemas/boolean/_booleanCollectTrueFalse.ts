// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isLiteralSchema } from '~/core-schemas/literal/isLiteral'
import { schema } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import { isUnionSchema } from '../union/IUnion'
import { isBooleanSchema } from './isBoolean'

/** @internal */
export function _booleanCollectTrueFalse(schemable: $$Schemable): {
	haveTrue: boolean
	haveFalse: boolean
} {
	const o = schema(schemable)

	if (isLiteralSchema(o)) {
		let haveTrue = false
		let haveFalse = false

		for (const t of o.getValues) {
			if (t === true) haveTrue = true
			else if (t === false) haveFalse = true
		}

		return { haveTrue, haveFalse }
	} else if (isBooleanSchema(o)) {
		return { haveTrue: true, haveFalse: true }
	} else if (isUnionSchema(o)) {
		let haveTrue = false
		let haveFalse = false

		for (const t of o.getSchemas) {
			const r = _booleanCollectTrueFalse(t)

			if (r.haveTrue) haveTrue = true

			if (r.haveFalse) haveFalse = true
		}

		return { haveTrue, haveFalse }
	} else return { haveTrue: false, haveFalse: false }
}
