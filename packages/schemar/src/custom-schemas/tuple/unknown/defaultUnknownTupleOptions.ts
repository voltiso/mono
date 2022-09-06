// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defaultSchemaOptions } from '~/Schema'

export const defaultUnknownTupleOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as unknown[],
	Input: 0 as unknown as unknown[],

	minLength: undefined,
	maxLength: undefined,

	isReadonlyTuple: false as const,
}

export const defaultMutableUnknownTupleOptions = {
	...defaultUnknownTupleOptions,
	isReadonlyTuple: false as const,
}

export const defaultReadonlyUnknownTupleOptions = {
	...defaultUnknownTupleOptions,
	isReadonlyTuple: true as const,
}
