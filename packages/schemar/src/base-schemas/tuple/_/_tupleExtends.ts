// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'

import type { ITuple, Schemable } from '~'
import { schema } from '~/core-schemas'

/** @internal */
export function _tupleExtends(thisTuple: ITuple, otherTuple: ITuple): boolean {
	const a = thisTuple.getShape
	const b = otherTuple.getShape

	if (a.length !== b.length) return false

	for (const [i, aa] of a.entries()) {
		const bb = b[i]
		$fastAssert(aa)
		$fastAssert(bb)

		if (!schema(aa as Schemable).extends(bb)) return false
	}

	return true
}
