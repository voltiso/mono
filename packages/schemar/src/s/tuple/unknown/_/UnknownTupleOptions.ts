// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'

import type { SchemaOptions } from '../../../../schema'
import { defaultSchemaOptions } from '../../../../schema'

export interface UnknownTupleOptions extends SchemaOptions {
	_out: readonly unknown[]
	_in: readonly unknown[]

	isReadonlyTuple: boolean

	minLength: number | undefined
	maxLength: number | undefined
}

export const defaultMutableUnknownTupleOptions = {
	...defaultSchemaOptions,
	_out: 0 as unknown as unknown[],
	_in: 0 as unknown as unknown[],
	isReadonlyTuple: false as const,
	minLength: undef,
	maxLength: undef,
}

export const defaultReadonlyUnknownTupleOptions = {
	...defaultSchemaOptions,
	_out: 0 as unknown as readonly unknown[],
	_in: 0 as unknown as readonly unknown[],
	isReadonlyTuple: true as const,
	minLength: undef,
	maxLength: undef,
}

export type DefaultMutableUnknownTupleOptions =
	typeof defaultMutableUnknownTupleOptions

export type DefaultReadonlyUnknownTupleOptions =
	typeof defaultReadonlyUnknownTupleOptions
