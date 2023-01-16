// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { $$Schemable } from '~/types/Schemable/Schemable'

export const defaultUnionOptions = lazyValue(() =>
	Object.freeze({
		...defaultSchemaOptions,

		schemas: 0 as unknown as $$Schemable[],
	}),
)
