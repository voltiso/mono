// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable} from '~';
import { isBooleanSchema, isLiteralSchema, isUnionSchema } from '~'
import { schema } from '~/core-schemas'

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
			// eslint-disable-next-line etc/no-internal
			const r = _booleanCollectTrueFalse(t)

			if (r.haveTrue) haveTrue = true

			if (r.haveFalse) haveFalse = true
		}

		return { haveTrue, haveFalse }
	} else return { haveTrue: false, haveFalse: false }
}
