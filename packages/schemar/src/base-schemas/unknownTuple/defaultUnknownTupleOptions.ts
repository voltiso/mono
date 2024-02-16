// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'

$fastAssert(defaultSchemaOptions)

export const defaultUnknownTupleOptions = Object.freeze({
	...defaultSchemaOptions,
	Output: 0 as unknown as unknown[],
	Input: 0 as unknown as unknown[],

	minLength: undefined,
	maxLength: undefined,

	isReadonlyTuple: false as const,
})

export const defaultMutableUnknownTupleOptions = Object.freeze({
	...defaultUnknownTupleOptions,
	isReadonlyTuple: false as const,
})

export const defaultReadonlyUnknownTupleOptions = Object.freeze({
	...defaultUnknownTupleOptions,
	isReadonlyTuple: true as const,
})
