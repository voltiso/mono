// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defaultSchemaOptions } from '~'

export const defaultUnknownObjectOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as object,
	Input: 0 as unknown as object,

	isPlain: false,
}
