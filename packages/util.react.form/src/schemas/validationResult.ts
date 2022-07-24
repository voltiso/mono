// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetType, ISchema, MergeOptions } from '@voltiso/schemar'
// eslint-disable-next-line n/file-extension-in-import
import * as s from '@voltiso/schemar'

export type ASDF<A extends ISchema, B> = MergeOptions<A, B>

export const validationResult = {
	success: s.boolean,

	issues: s.array({
		message: s.string,
	}).optional,
}

export type ValidationResult = GetType<typeof validationResult>
