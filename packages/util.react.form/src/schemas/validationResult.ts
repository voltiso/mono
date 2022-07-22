// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetType } from '@voltiso/schemar'
// eslint-disable-next-line n/file-extension-in-import
import * as s from '@voltiso/schemar/s'

export const validationResult = {
	success: s.boolean,

	issues: s.array({
		message: s.string,
	}).optional,
}

export type ValidationResult = GetType<typeof validationResult>
