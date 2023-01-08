// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defaultSchemaOptions } from '~'

export const defaultUnknownRecordOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as Record<keyof any, unknown>,
	Input: 0 as unknown as Record<keyof any, unknown>,
}
