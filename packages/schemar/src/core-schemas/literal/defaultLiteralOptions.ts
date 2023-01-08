// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type * as t from '~'
import { defaultSchemaOptions } from '~'

export const defaultLiteralOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	Output: 0 as unknown as t.InferableLiteral,
	Input: 0 as unknown as t.InferableLiteral,

	values: 0 as unknown as Set<never>,
}))
