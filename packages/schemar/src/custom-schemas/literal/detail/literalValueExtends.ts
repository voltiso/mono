// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS } from '_'

import type { InferableLiteral, ISchema } from '~'
import { getBaseSchema, isVoid } from '~'

export function literalValueExtends(a: InferableLiteral, b: ISchema): boolean {
	if (typeof a === 'undefined' && isVoid(b)) return true
	// eslint-disable-next-line security/detect-object-injection
	else return getBaseSchema(a)[EXTENDS](b)
}
