// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schema } from '@voltiso/schemar.types'

export function isSchema(x: unknown): x is Schema {
	return typeof (x as Schema | null)?.tryValidate === 'function'

	// // eslint-disable-next-line security/detect-object-injection
	// return isDefined((x as Schema | null)?.[SCHEMA_NAME]) // SCHEMA_NAME may be from different instance of library code
}
