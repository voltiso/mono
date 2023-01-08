// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type * as t from '~'
import { defaultSchemaOptions } from '~'

export const defaultUnionOptions = lazyValue(() => ({
	...defaultSchemaOptions,

	schemas: 0 as unknown as t.$$Schemable[],
}))
