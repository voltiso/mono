// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { InferableLiteral } from '~/types/Inferable/Inferable'

$assert(defaultSchemaOptions)

export const defaultLiteralOptions = Object.freeze({
	...defaultSchemaOptions,

	Output: 0 as unknown as InferableLiteral,
	Input: 0 as unknown as InferableLiteral,

	values: 0 as unknown as Set<never>,
})
