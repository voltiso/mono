import { assert } from '@voltiso/ts-util'
import { ITuple } from '../ITuple'
import * as s from '../..'

export function _extends(thisTuple: ITuple, otherTuple: ITuple): boolean {
	const a = thisTuple.getElementSchemas
	const b = otherTuple.getElementSchemas

	if (a.length !== b.length) return false
	for (let i = 0; i < a.length; ++i) {
		const aa = a[i]
		const bb = b[i]
		assert(aa)
		assert(bb)
		if (!s.schema(aa).extends(bb)) return false
	}
	return true
}
