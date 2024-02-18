// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'

import type { BivariantUnknownFunction } from './UnknownFunctionOptions'

$fastAssert(defaultSchemaOptions)

export const defaultUnknownFunctionOptions = Object.freeze({
	...defaultSchemaOptions,

	Output: 0 as unknown as BivariantUnknownFunction,
	Input: 0 as unknown as BivariantUnknownFunction,
})
