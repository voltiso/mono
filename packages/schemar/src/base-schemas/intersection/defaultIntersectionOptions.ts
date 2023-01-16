// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { $$Schemable } from '~/types/Schemable/Schemable'

$assert(defaultSchemaOptions)

export const defaultIntersectionOptions = Object.freeze({
	...defaultSchemaOptions,

	schemas: 0 as unknown as $$Schemable[],
})
