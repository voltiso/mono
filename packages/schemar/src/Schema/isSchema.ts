// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { $assert } from '@voltiso/util'

import type { ISchema$, Schema } from '~'

export function isSchema(x: unknown): x is ISchema$ {
	$assert(SCHEMA_NAME)

	return !!(x as Schema | null)?.[SCHEMA_NAME]
}
