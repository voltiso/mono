// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'

import type { ITuple, Schemable } from '~'
import { schema } from '~'

export function _extends(thisTuple: ITuple, otherTuple: ITuple): boolean {
	const a = thisTuple.getShape
	const b = otherTuple.getShape

	if (a.length !== b.length) return false

	for (const [i, aa] of a.entries()) {
		// eslint-disable-next-line security/detect-object-injection
		const bb = b[i]
		$assert(aa)
		$assert(bb)

		if (!schema(aa as Schemable).extends(bb)) return false
	}

	return true
}
