// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defaultSchemaOptions } from '~'

export const defaultNumberOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as number,
	Input: 0 as unknown as number,

	isInteger: false as const,
	min: undefined,
	max: undefined,
}
