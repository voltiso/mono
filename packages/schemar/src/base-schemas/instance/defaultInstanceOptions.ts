// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'

$assert(defaultSchemaOptions)

export const defaultInstanceOptions = Object.freeze({
	...defaultSchemaOptions,

	Constructor: 0 as unknown as abstract new (...args: any[]) => object,

	Output: 0 as unknown as object,
	Input: 0 as unknown as object,
})
