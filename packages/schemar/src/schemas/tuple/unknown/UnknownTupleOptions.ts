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

export const defaultUnknownTupleOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as unknown[],
	Input: 0 as unknown as unknown[],

	minLength: undef,
	maxLength: undef,

	isReadonlyTuple: false as const,
}

export type DefaultUnknownTupleOptions = typeof defaultUnknownTupleOptions

//

export const defaultMutableUnknownTupleOptions = {
	...defaultUnknownTupleOptions,
	isReadonlyTuple: false as const,
}

export type DefaultMutableUnknownTupleOptions =
	typeof defaultMutableUnknownTupleOptions

//

export const defaultReadonlyUnknownTupleOptions = {
	...defaultUnknownTupleOptions,
	isReadonlyTuple: true as const,
}

export type DefaultReadonlyUnknownTupleOptions =
	typeof defaultReadonlyUnknownTupleOptions
