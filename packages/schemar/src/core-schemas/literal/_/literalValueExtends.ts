// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableLiteral, ISchema } from '~'
import { EXTENDS } from '~'
import { isVoidSchema } from '~/base-schemas/void/detail/isVoid'

import { getBaseSchema } from './getBaseSchema'

export function literalValueExtends(a: InferableLiteral, b: ISchema): boolean {
	if (a === undefined && isVoidSchema(b)) return true
	// eslint-disable-next-line security/detect-object-injection
	else return getBaseSchema(a)[EXTENDS](b)
}
