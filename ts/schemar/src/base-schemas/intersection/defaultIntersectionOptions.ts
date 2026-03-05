// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { $$Schemable } from '~/types/Schemable/Schemable'

$fastAssert(defaultSchemaOptions)

export const defaultIntersectionOptions = Object.freeze({
	...defaultSchemaOptions,

	schemas: 0 as unknown as $$Schemable[],
})
