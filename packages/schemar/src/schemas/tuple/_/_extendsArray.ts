// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '../../index'
import type { IArray } from '../../array/index'
import type { ITuple } from '../ITuple.js'

export function _extendsArray(thisTuple: ITuple, otherArray: IArray): boolean {
	for (const t of thisTuple.getElementSchemas)
		if (!s.schema(t).extends(otherArray.getElementSchema)) return false

	return true
}
