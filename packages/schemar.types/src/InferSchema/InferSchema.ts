// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '@voltiso/util'

import type {
	Instance,
	Literal,
	MutableTuple,
	Object,
	ReadonlyTuple,
} from '~/custom-schemas'
import type {
	InferableLiteral,
	InferableMutableTupleLike,
	InferableObjectLike,
	InferableReadonlyTupleLike,
} from '~/Inferable'
import type { ISchema, SchemaLike } from '~/Schema'
import type { SchemableLike } from '~/Schemable'

export type InferSchema_<S> = [S] extends [InferableLiteral]
	? Literal<S>
	: S extends Newable
	? Instance<S>
	: S extends ISchema
	? S
	: S extends SchemaLike
	? ISchema
	: S extends InferableMutableTupleLike
	? MutableTuple<S>
	: S extends InferableReadonlyTupleLike
	? ReadonlyTuple<[...S]>
	: S extends InferableObjectLike
	? // eslint-disable-next-line @typescript-eslint/ban-types
	  Object<S>
	: never

export type InferSchema<S extends SchemableLike> = InferSchema_<S>

export type $InferSchema_<S> = S extends any ? InferSchema_<S> : never

export type $InferSchema<S extends SchemableLike> = S extends any
	? InferSchema_<S>
	: never
