// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'

export const sUserId = s.string.regex(
	/^[\dA-Za-z]{28}$/u,
	'userId must be 28 alphanumeric characters',
)
