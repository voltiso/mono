// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { $$Schemable } from '~/types/Schemable/Schemable'

$fastAssert(defaultSchemaOptions)

export const defaultTupleOptions = Object.freeze({
	...defaultSchemaOptions,

	Output: 0 as unknown as readonly unknown[],
	Input: 0 as unknown as readonly unknown[],

	isReadonlyTuple: false as const,
	shape: 0 as unknown as $$Schemable[],
})

export const defaultMutableTupleOptions = Object.freeze({
	...defaultTupleOptions,
	isReadonlyTuple: false as const,
})

export const defaultReadonlyTupleOptions = Object.freeze({
	...defaultTupleOptions,
	isReadonlyTuple: true as const,
})
