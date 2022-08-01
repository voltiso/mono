// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { isDefined } from '@voltiso/util'

import type { Schema } from './Schema'

export function isSchema(x: unknown): x is Schema {
	// eslint-disable-next-line security/detect-object-injection
	return isDefined((x as Schema | null)?.[SCHEMA_NAME])
}
