// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { InferableLiteral } from '~/types/Inferable/Inferable'

$fastAssert(defaultSchemaOptions)

export const defaultUnknownLiteralOptions = Object.freeze({
	...defaultSchemaOptions,

	Output: 0 as InferableLiteral,
	Input: 0 as InferableLiteral,
})
