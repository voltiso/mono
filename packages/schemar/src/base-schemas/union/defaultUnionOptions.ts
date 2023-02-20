// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyObject } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { $$Schemable } from '~/types/Schemable/Schemable'

export const defaultUnionOptions = lazyObject(() =>
	Object.freeze({
		...defaultSchemaOptions,

		schemas: 0 as unknown as $$Schemable[],
	}),
)
