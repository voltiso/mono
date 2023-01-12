// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ArrayOptions } from '~'
import { defaultSchemaOptions } from '~'

import { unknown } from '../unknown'

export const defaultArrayOptions: ArrayOptions.Default = {
	...defaultSchemaOptions,
	Output: 0 as unknown as readonly unknown[],
	Input: 0 as unknown as readonly unknown[],

	isReadonlyArray: false as const,

	element: unknown,
	minLength: undefined,
	maxLength: undefined,
}

export const defaultMutableArrayOptions = {
	...defaultArrayOptions,
	isReadonlyArray: false as const,
}

export const defaultReadonlyArrayOptions = {
	...defaultArrayOptions,
	isReadonlyArray: true as const,
}
