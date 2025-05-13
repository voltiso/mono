// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS } from '_'

import { isVoidSchema } from '~/base-schemas/void/detail/isVoid'
import type { InferableLiteral } from '~/types/Inferable/Inferable'
import type { Schema } from '~/types/Schema/ISchema'

import { getBaseSchema } from './getBaseSchema'

export function literalValueExtends(a: InferableLiteral, b: Schema): boolean {
	if (a === undefined && isVoidSchema(b)) return true
	else return getBaseSchema(a)[EXTENDS](b)
}
