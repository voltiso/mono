// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'

import { unknown } from '../unknown/Unknown'
import type { ArrayOptions } from './ArrayOptions'

$assert(defaultSchemaOptions)

export const defaultArrayOptions: ArrayOptions.Default = Object.freeze({
	...defaultSchemaOptions,
	Output: 0 as unknown as readonly unknown[],
	Input: 0 as unknown as readonly unknown[],

	isReadonlyArray: false as const,

	element: unknown,
	minLength: undefined,
	maxLength: undefined,
})

export const defaultMutableArrayOptions = Object.freeze({
	...defaultArrayOptions,
	isReadonlyArray: false as const,
})

export const defaultReadonlyArrayOptions = Object.freeze({
	...defaultArrayOptions,
	isReadonlyArray: true as const,
})
