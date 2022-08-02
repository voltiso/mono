// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetType } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'

//! TODO: use schemar?

export const validationResult = {
	success: s.boolean,

	issues: s.array({
		message: s.string,
	}).optional,
}

export type ValidationResult = GetType<typeof validationResult>
