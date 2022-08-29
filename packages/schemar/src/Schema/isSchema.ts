// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schema } from '@voltiso/schemar.types'
import { SCHEMA_NAME } from '@voltiso/schemar.types'
import { isDefined } from '@voltiso/util'

export function isSchema(x: unknown): x is Schema {
	// eslint-disable-next-line security/detect-object-injection
	return isDefined((x as Schema | null)?.[SCHEMA_NAME])
}
