// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'

$assert(defaultSchemaOptions)

export const defaultStringOptions = Object.freeze({
	...defaultSchemaOptions,

	Output: 0 as unknown as string,
	Input: 0 as unknown as string,

	minLength: undefined,
	maxLength: undefined,
	regExps: [] as [],
})
