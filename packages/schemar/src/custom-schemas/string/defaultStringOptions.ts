// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defaultSchemaOptions } from '~/Schema'

export const defaultStringOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as string,
	Input: 0 as unknown as string,
	minLength: undefined,
	maxLength: undefined,
	regExps: [] as [],
}
