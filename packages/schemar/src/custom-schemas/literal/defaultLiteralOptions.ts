// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyValue } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema'

export const defaultLiteralOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	Output: 0 as unknown as t.InferableLiteral,
	Input: 0 as unknown as t.InferableLiteral,

	values: 0 as unknown as Set<never>,
}))
