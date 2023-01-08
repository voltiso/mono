// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IArray, ITuple, Schemable } from '~'
import { schema } from '~/core-schemas'

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
