// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IArray, ITuple } from '~'
import { schema } from '~'

export function _extendsArray(thisTuple: ITuple, otherArray: IArray): boolean {
	for (const t of thisTuple.getElementSchemas)
		if (!schema(t).extends(otherArray.getElementSchema)) return false

	return true
}
