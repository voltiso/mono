// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyValue } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema'

export const defaultUnionOptions = lazyValue(() => ({
	...defaultSchemaOptions,

	schemas: 0 as unknown as t.$$Schemable[],
}))
