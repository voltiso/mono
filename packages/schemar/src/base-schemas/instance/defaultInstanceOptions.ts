// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defaultSchemaOptions } from '~/Schema'

export const defaultInstanceOptions = {
	...defaultSchemaOptions,

	Constructor: 0 as unknown as abstract new (...args: any[]) => object,

	Output: 0 as unknown as object,
	Input: 0 as unknown as object,
}
