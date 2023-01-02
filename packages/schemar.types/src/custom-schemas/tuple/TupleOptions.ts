// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2, Merge2_ } from '@voltiso/util'

import type { $$Schemable, DefaultSchemaOptions, SchemaOptions } from '~'

export interface TupleOptions<T extends readonly unknown[] = readonly unknown[]>
	extends SchemaOptions {
	Output: T
	Input: T

	isReadonlyTuple: boolean

	shape: $$Schemable[]
	hasRest: boolean
	rest: $$Schemable | undefined
}

//

export interface DefaultTupleOptions extends DefaultSchemaOptions {
	Output: readonly unknown[]
	Input: readonly unknown[]

	isReadonlyTuple: false
	shape: $$Schemable[]
}

export type DefaultMutableTupleOptions = Merge2_<
	DefaultTupleOptions,
	{ isReadonlyTuple: false }
>

export type DefaultReadonlyTupleOptions = Merge2<
	DefaultTupleOptions,
	{ isReadonlyTuple: true }
>
