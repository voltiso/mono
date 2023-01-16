// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'

import type { AnyOptions } from './AnyOptions'

$assert(defaultSchemaOptions)

export const defaultAnyOptions: AnyOptions.Default = Object.freeze({
	...defaultSchemaOptions,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	Output: 0 as any,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	Input: 0 as any,
})
