// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as t from '@voltiso/schemar.types'

import { schema } from '~/custom-schemas'

/** @internal */
export function _booleanCollectTrueFalse(schemable: t.$$Schemable): {
	haveTrue: boolean
	haveFalse: boolean
} {
	const o = schema(schemable)

	if (t.isLiteral(o)) {
		let haveTrue = false
		let haveFalse = false

		for (const t of o.getValues) {
			if (t === true) haveTrue = true
			else if (t === false) haveFalse = true
		}

		return { haveTrue, haveFalse }
	} else if (t.isBoolean(o)) {
		return { haveTrue: true, haveFalse: true }
	} else if (t.isUnion(o)) {
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
