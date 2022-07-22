// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../../schema'
import { EXTENDS } from '../../../schema/_/symbols.js'
import type { InferableLiteral } from '../../../schema/Schemable.js'
import { isVoid } from '../../void'
import { getBaseSchema } from './getBaseSchema.js'

export function literalValueExtends(a: InferableLiteral, b: ISchema): boolean {
	if (typeof a === 'undefined' && isVoid(b)) return true
	// eslint-disable-next-line security/detect-object-injection
	else return getBaseSchema(a)[EXTENDS](b)
}
