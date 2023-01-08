// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defaultSchemaOptions } from '~'

export const defaultBigintOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as bigint,
	Input: 0 as unknown as bigint,

	min: undefined,
	max: undefined,
}
