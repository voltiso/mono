// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2, Merge2_ } from '@voltiso/util'

import type { DefaultSchemaOptions, SchemableLike, SchemaOptions } from '~'

export interface TupleOptions extends SchemaOptions {
	Output: readonly unknown[]
	Input: readonly unknown[]

	isReadonlyTuple: boolean
	shape: SchemableLike[]
}

//

export interface DefaultTupleOptions extends DefaultSchemaOptions {
	Output: readonly unknown[]
	Input: readonly unknown[]

	isReadonlyTuple: false
	shape: SchemableLike[]
}

export type DefaultMutableTupleOptions = Merge2_<
	DefaultTupleOptions,
	{ isReadonlyTuple: false }
>

export type DefaultReadonlyTupleOptions = Merge2<
	DefaultTupleOptions,
	{ isReadonlyTuple: true }
>
