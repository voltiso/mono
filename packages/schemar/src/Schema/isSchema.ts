// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { $assert } from '@voltiso/util'

import type { ISchema$ } from '~/types/Schema/ISchema'
import type { Schema } from '~/types/Schema/Schema'

export function isSchema(x: unknown): x is ISchema$ {
	$assert(SCHEMA_NAME)

	return !!(x as Schema | null)?.[SCHEMA_NAME]
}
