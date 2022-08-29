import type { Newable } from '@voltiso/util'
import type { Literal, MutableTuple, Instance, Object } from '~/custom-schemas'
import type {
	InferableLiteral,
	InferableObjectLike,
	InferableReadonlyTuple,
} from '~/Inferable'
import type { SchemaLike } from '~/Schema'
import type { SchemableLike } from '~/Schemable'

export type InferSchemaNoReadonlyTuple_<T> = T extends InferableLiteral
	? Literal<T>
	: T extends Newable
	? Instance<T>
	: T extends SchemaLike
	? T
	: T extends InferableReadonlyTuple
	? MutableTuple<[...T]>
	: T extends InferableObjectLike
	? // eslint-disable-next-line @typescript-eslint/ban-types
	  Object<T>
	: never

export type InferSchemaNoReadonlyTuple<T extends SchemableLike> =
	InferSchemaNoReadonlyTuple_<T>
