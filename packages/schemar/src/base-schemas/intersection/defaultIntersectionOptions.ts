// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { $$Schemable } from '~'
import { defaultSchemaOptions } from '~'

export const defaultIntersectionOptions = lazyValue(() => ({
	...defaultSchemaOptions,

	schemas: 0 as unknown as $$Schemable[],
}))
