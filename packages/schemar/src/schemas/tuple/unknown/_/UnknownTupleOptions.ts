// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'

import type { SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface UnknownTupleOptions extends SchemaOptions {
	Output: readonly unknown[]
	Input: readonly unknown[]

	isReadonlyTuple: boolean

	minLength: number | undefined
	maxLength: number | undefined
}

export const defaultMutableUnknownTupleOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as unknown[],
	Input: 0 as unknown as unknown[],

	isReadonlyTuple: false as const,
	minLength: undef,
	maxLength: undef,
}

export const defaultReadonlyUnknownTupleOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as readonly unknown[],
	Input: 0 as unknown as readonly unknown[],

	isReadonlyTuple: true as const,
	minLength: undef,
	maxLength: undef,
}

export type DefaultMutableUnknownTupleOptions =
	typeof defaultMutableUnknownTupleOptions

export type DefaultReadonlyUnknownTupleOptions =
	typeof defaultReadonlyUnknownTupleOptions
