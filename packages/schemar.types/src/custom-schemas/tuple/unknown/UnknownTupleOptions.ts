// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2_ } from '@voltiso/util'
import type { DefaultSchemaOptions, SchemaOptions } from '~'

export interface UnknownTupleOptions extends SchemaOptions {
	Output: readonly unknown[]
	Input: readonly unknown[]

	isReadonlyTuple: boolean

	minLength: number | undefined
	maxLength: number | undefined
}

//

export interface DefaultUnknownTupleOptions extends DefaultSchemaOptions {
	Output: unknown[]
	Input: unknown[]

	minLength: undefined
	maxLength: undefined

	isReadonlyTuple: false
}

export type DefaultMutableUnknownTupleOptions = Merge2_<
	DefaultUnknownTupleOptions,
	{ isReadonlyTuple: false }
>

export type DefaultReadonlyUnknownTupleOptions = Merge2_<
	DefaultUnknownTupleOptions,
	{ isReadonlyTuple: true }
>
