// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAlmostSame, Newable } from '@voltiso/util'

import type * as t from '~/custom-schemas'
import type {
	InferableLiteral,
	InferableMutableTupleLike,
	InferableObjectLike,
	InferableReadonlyTupleLike,
} from '~/Inferable'
import type { ISchema, SchemaLike } from '~/Schema'
import type { SchemableLike } from '~/Schemable'

export type InferSchema_<S> = S extends Newable
	? t.Instance<S>
	: S extends InferableMutableTupleLike
	? t.MutableTuple<S>
	: S extends InferableReadonlyTupleLike
	? t.ReadonlyTuple<[...S]>
	: IsAlmostSame<S, {}> extends true
	? t.ImplicitObject<{}>
	: InferableObjectLike extends S
	? t.IObject
	: SchemaLike extends S
	? ISchema
	: t.ObjectLike extends S
	? t.IObject
	: S extends InferableObjectLike
	? t.ImplicitObject<S>
	: S extends SchemaLike
	? S
	: S extends InferableLiteral
	? t.Literal<S>
	: never

export type InferSchema<S extends SchemableLike> = InferSchema_<S>

export type $InferSchema_<S> = S extends any ? InferSchema_<S> : never

export type $InferSchema<S extends SchemableLike> = S extends any
	? InferSchema_<S>
	: never
