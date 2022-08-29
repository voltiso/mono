// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableLiteral, ISchema } from '@voltiso/schemar.types'
import { isVoid } from '@voltiso/schemar.types'
import { EXTENDS } from '@voltiso/schemar.types'

import { getBaseSchema } from '~'

export function literalValueExtends(a: InferableLiteral, b: ISchema): boolean {
	if (typeof a === 'undefined' && isVoid(b)) return true
	// eslint-disable-next-line security/detect-object-injection
	else return getBaseSchema(a)[EXTENDS](b)
}