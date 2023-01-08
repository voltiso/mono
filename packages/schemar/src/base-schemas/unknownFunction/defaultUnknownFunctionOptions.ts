// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type * as t from '~'
import { defaultSchemaOptions } from '~'

export const defaultUnknownFunctionOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	Output: 0 as unknown as t.BivariantUnknownFunction,
	Input: 0 as unknown as t.BivariantUnknownFunction,
}))
