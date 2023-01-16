// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'

import type { BivariantUnknownFunction } from './UnknownFunctionOptions'

$assert(defaultSchemaOptions)

export const defaultUnknownFunctionOptions = Object.freeze({
	...defaultSchemaOptions,

	Output: 0 as unknown as BivariantUnknownFunction,
	Input: 0 as unknown as BivariantUnknownFunction,
})
