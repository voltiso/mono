// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Newable } from '@voltiso/util'
import { isConstructor } from '@voltiso/util'

import type {
	InferableLike,
	InferableLiteral,
	InferableMutableTupleLike,
	InferableObjectLike,
	InferableReadonlyTuple,
	InferableReadonlyTupleLike,
	Instance,
	ISchema,
	Literal,
	MutableTuple,
	Object,
	ReadonlyTuple,
	SchemableLike,
	SchemaLike,
} from '~'
import { isSchema } from '~'
import { instance, literal, object, tuple } from '~/custom-schemas'

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

//

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

//

/**
 * Infer schema (not type!)
 *
 * @param inferable - A value to infer schema from (object, tuple, literal, ...)
 */
export function infer<T extends InferableLike>(
	inferable: T,
): InferSchemaNoReadonlyTuple<T>

/**
 * Infer schema (not type!)
 *
 * - This overload is no-op (already a Schema!)
 *
 * @param schema - A value that is already a schema
 */
export function infer<T extends SchemaLike>(schema: T): T

/**
 * Infer schema (not type!)
 *
 * - This overload is a catch-all for previous overloads
 *
 * @param inferableOrSchema - An inferable value (object, tuple, literal, ...)
 *   or already schema
 */
export function infer<T extends SchemableLike>(
	inferableOrSchema: T,
): InferSchemaNoReadonlyTuple<T>

//

export function infer<T extends SchemableLike>(
	t: T,
): InferSchemaNoReadonlyTuple<T> {
	if (isSchema(t)) return t as never
	else if (
		t === null ||
		['string', 'number', 'symbol', 'boolean', 'bigint', 'undefined'].includes(
			typeof t,
		)
	) {
		return literal(t as InferableLiteral) as never
	} else if (isConstructor(t)) {
		return instance(t) as never
	} else if (Array.isArray(t)) return tuple(...t) as never
	else return object(t as never) as never
}

export type InferSchemaFunction = typeof infer
