// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable } from '~'
import { isBoolean, isLiteral, isUnion, schema } from '~'

// eslint-disable-next-line sonarjs/cognitive-complexity
export function collectTrueFalse(schemable: Schemable): {
	haveTrue: boolean
	haveFalse: boolean
} {
	const o = schema(schemable)

	if (isLiteral(o)) {
		let haveTrue = false
		let haveFalse = false

		for (const t of o.getValues) {
			if (t === true) haveTrue = true
			else if (t === false) haveFalse = true
		}

		return { haveTrue, haveFalse }
	} else if (isBoolean(o)) {
		return { haveTrue: true, haveFalse: true }
	} else if (isUnion(o)) {
		let haveTrue = false
		let haveFalse = false

		for (const t of o.getSchemas) {
			const r = collectTrueFalse(t)

			if (r.haveTrue) haveTrue = true

			if (r.haveFalse) haveFalse = true
		}

		return { haveTrue, haveFalse }
	} else return { haveTrue: false, haveFalse: false }
}
