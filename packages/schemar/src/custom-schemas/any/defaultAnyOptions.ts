// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defaultSchemaOptions } from '~/Schema'

export const defaultAnyOptions = {
	...defaultSchemaOptions,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	Output: 0 as any,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	Input: 0 as any,
}
