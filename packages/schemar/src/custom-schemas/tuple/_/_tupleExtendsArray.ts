// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IArray, ITuple, Schemable } from '@voltiso/schemar.types'

import { schema } from '~'

/** @internal */
export function _tupleExtendsArray(
	thisTuple: ITuple,
	otherArray: IArray,
): boolean {
	for (const t of thisTuple.getShape)
		if (!schema(t as Schemable).extends(otherArray.getElementSchema))
			return false

	return true
}
