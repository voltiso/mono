// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'

/** 🧙‍♂️ Validate default auto-generated document ID */
export const sAutoId = s.string.regex(
	/^[\dA-Za-z]{20}$/u,
	'autoId must be 20 alphanumeric characters',
)
